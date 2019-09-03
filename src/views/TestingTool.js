import React, { Component } from 'react'
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import validate from 'validate.js';
import AddProperty from '../components/TestingToolComponents/AddProperty';
import DataView from '../components/TestingToolComponents/DataView';

export default class TestingTool extends Component {
  constructor(props){
    super(props)
    this.encodeURL = this.encodeURL.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.parseRow = this.parseRow.bind(this);
    this.renderView = this.renderView.bind(this);

    // Property Form
    this.addProperty = this.addProperty.bind(this);
    this.saveEdited = this.saveEdited.bind(this);
    this.upadteCurrentItem = this.upadteCurrentItem.bind(this);
    this.createNewDataSet = this.createNewDataSet.bind(this);

    // Pagination
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

    this.state = {
      // url: 'https://record-store.azurewebsites.net/api/records?where=c.Make%3D%27Genesis%27&q%3Dc.Condition%3D%27Used%27',
      url: 'https://record-store.azurewebsites.net/api/records',
      response: null,
      error: null,
      pages: null,
      currentPage: 0,
      currentItem: {},
      temporaryCurrentItem: null
    }
  }

  onRequest(){
    const {url} = this.state;
    const APIURL = new URL(url);
    const EncodedURL = this.encodeURL(APIURL);

    const self = this;
    axios.get(EncodedURL.href)
      .then(function (response) {
        // handle success
        self.setState({
          response: response.data,
          pages: response.data.length,
          currentItem: response.data[0]
        })
      })
      .catch(function (error) {
        // handle error
        self.setState({error: error})
      })
  }

  encodeURL(APIURL){
    const query = validate.collectFormValues(document.getElementById('app__testing__query'));
    if( query['query'] != null ) {
      APIURL.search = "?where=" + query['query'];
    }
    return APIURL;
  }

  addProperty(property) {
    const { currentItem } = this.state;
    const updatedItem = Object.assign(currentItem, property);
    this.setState({temporaryCurrentItem: updatedItem});
  }

  renderView(){
    const {error, response, currentItem, temporaryCurrentItem} = this.state;
    let row = null;
    if( response != null ) {
      if( temporaryCurrentItem == null ) {
        row = this.parseRow(currentItem);
      }else {
        row = this.parseRow(temporaryCurrentItem);
      }
    }

    if( error ) {
      return (
        <div className="error__message">
          <p className="default">An error has occured. </p>
          <p className="url"> URL: {error.config.url}</p>
          <p className="message">{error.message}</p>
        </div>
      )
    }
    return response != null ? <div>{row}</div>: <div>No Data</div>;
  }

  // Return a full dom element with the list
  parseRow(object){
    const DisplayItem = [];
    let index = 0;
    let isEmpty = true;
    for( let param in object ) {
      isEmpty = object[param].length > 0;
      DisplayItem.push(
        <p className={!isEmpty ? 'row row--emtpy' : 'row'} key={index}>
          <span className="name">{param}</span>:
          <span className="details">{object[param]}</span>
        </p>);
      index++
    }
    return DisplayItem;
  }

  // PAGINATION
  nextPage(){
    const { currentPage, pages, response } = this.state;
    if( currentPage == pages - 1 ) return;
    this.setState({
      currentPage: currentPage + 1,
      currentItem: response[currentPage + 1]
    })
  }

  prevPage() {
    const { currentPage, response } = this.state;
    if( currentPage == 0 ) return;
    this.setState({
      currentPage: currentPage - 1,
      currentItem: response[currentPage - 1]
    })
  }

  // UPDATE AND SAVE
  upadteCurrentItem(data, field, oldValue){
    const current = this.state.currentItem;
    if( Object.keys(current).includes(oldValue) ){
      current[data] = current[oldValue]
      delete current[oldValue];
    } else if (Object.values(current).includes(oldValue) ){
      const key = Object.keys(current).find(key => current[key] === oldValue);
      current[key] = data;
    }
    this.setState({
      currentItem: current,
    })
  }

  saveEdited(){
    console.log("Save");
  }

  createNewDataSet(){
    this.setState({
      currentItem: {
        id: uuidv1()
      },
      currentPage: 0,
      temporaryCurrentItem: null,
      pages: null
    })
  }

  render() {
    const {pages, currentPage, temporaryCurrentItem, currentItem} = this.state;
    console.log(this.state)
    return (
      <div className="app__testing">
        <aside className="app__testing__form">
          <header className="app__testing__query" id="app__testing__query">
            <h1 className="app__testing__title">Query Settings</h1>
            <div className="app__input__row">
              <label>Query: </label>
              <textarea name="query" placeholder="c.Make='Chevrolet'"></textarea>
            </div>
            <button className="app__load__query" onClick={this.onRequest}>Load Live Data</button>
          </header>
          <AddProperty addProperty={this.addProperty} isDisabled={currentItem == {}} />
          <button onClick={this.saveEdited} disabled={temporaryCurrentItem == null}>Save </button>
          <button onClick={this.createNewDataSet}>Create New Data Set</button>
        </aside>
        <div className="app__testing__data">
          <DataView upadteCurrentItem={this.upadteCurrentItem} data={currentItem} />
          <div className="app__pagination">
            <button className="prev" onClick={this.prevPage}>Previous Page</button>
            {pages != null && pages > 0 ? <div className="pages">{currentPage + 1}/{pages}</div> : ''}
            <button className="next" onClick={this.nextPage}>Next Page</button>
          </div>
        </div>
      </div>
    )
  }
}
