import React, { Component } from 'react'
import axios from 'axios';
import uuidv1 from 'uuid/v1';
import validate from 'validate.js';
import DataView from '../components/TestingToolComponents/DataView';
import DataSetTemplate from '../utils/DatasetTemplate';

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
    this.updateCurrentItem = this.updateCurrentItem.bind(this);
    this.createNewDataSet = this.createNewDataSet.bind(this);
    this.onSaveNewDataSet = this.onSaveNewDataSet.bind(this);

    // ITEM
    this.createNewItem = this.createNewItem.bind(this);

    // FORM
    this.onChange = this.onChange.bind(this);
    this.onToggle = this.onToggle.bind(this);

    // Pagination
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

    this.state = {
      // url: 'https://record-store.azurewebsites.net/api/records?where=c.Make%3D%27Genesis%27&q%3Dc.Condition%3D%27Used%27',
      recordsUrl: 'https://record-store.azurewebsites.net/api/records',
      dataSetUrl: 'https://apix.purecars.com/display/test/v1/data',

      useQuery: false,
      isLoading: false,

      datasets: [],
      response: null,
      selectedDataSet: null,

      error: null,
      pages: null,
      currentPage: 0,
      currentItem: {},
      temporaryCurrentItem: null
    }
  }

  componentWillMount() {
    const URL = 'https://apix.purecars.com/display/test/v1/data';
    axios.get(URL).then(response => {
      this.setState({datasets: response.data})
    }).catch(error => console.log(error));
  }

  onChange(e){
    e.target.value == "" ?
      this.setState({selectedDataSet: null}) :
      this.setState({selectedDataSet: e.target.value});
  }

  onToggle(e){
    this.setState({useQuery: !this.state.useQuery})
  }

  onRequest(){
    const {dataSetUrl, recordsUrl, selectedDataSet, useQuery } = this.state;
    let APIURL;

    if( !useQuery ){
      APIURL = new URL(`${dataSetUrl}/${selectedDataSet}`);
    }else {
      APIURL = new URL(`${recordsUrl}`);
      APIURL = this.encodeURL(APIURL);
    }

    const self = this;
    console.log(this.state);

    this.setState({ isLoading: true }, () => {
      axios.get(APIURL.href)
      .then(function (response) {
        // handle success
        if( !useQuery ) {
          self.setState({
            response: response.data.data,
            pages: response.data.data.length,
            currentItem: response.data.data[0],
            currentPage: 0,
            isLoading: false
          });
        }else {
          self.setState({
            response: response.data,
            pages: response.data.length,
            currentItem: response.data[0],
            currentPage: 0,
            isLoading: false
          });
        }
      })
      .catch(function (error) {
        // handle error
        self.setState({
          response: null,
          pages: 0,
          currentItem: null,
          currentPage: 0,
          error: error,
          isLoading: false
        })
      });
    });
  }

  onSaveNewDataSet() {
    const { dataSetUrl }= this.state;
    axios.post( dataSetUrl, {
      name: "Chevy DataSet",
      data: [
        {
          make: "Chevrolet",
          model: "Camaron"
        },
        {
          make: 'Ford',
          model: 'Focus'
        }
      ]
    })
  }

  encodeURL(APIURL){
    const query = validate.collectFormValues(document.getElementById('app__query'));
    query['query'] != null ? APIURL.search = "?where=" + query['query'] : false;
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

  // Creeate ITEM
  createNewItem(){

  }

  // UPDATE AND SAVE
  updateCurrentItem(data, field, oldValue){
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
    const {pages, currentPage, datasets, currentItem, selectedDataSet, useQuery, isLoading} = this.state;
    console.log(this.state)
    return (
      <div className="app__testing">
        <aside className="app__testing__aside">
          <header className="app__testing__header">
            <h3>Datasets</h3>
          </header>

          <div className="app__testing__query">

            <div className="form-control v-centered">
              <label className="switch">
                <input type="checkbox" onClick={this.onToggle} />
                <span className="slider round"></span>
              </label>
              <span className="label">Create Dataset from Query</span>
            </div>

            <div className="q_form--divider"></div>

            <div className="form-control no-margin" id="app__select">
              <select disabled={useQuery} onChange={this.onChange} name="q_dataset">
                <option value="">Select a Dataset</option>
                { datasets.map( set => (<option value={set.id} key={set.id}>{set.name}</option>) )}
              </select>
            </div>

            <div className="q_form--divider"></div>

            <div className="form-control"  id="app__query">
              <textarea disabled={!useQuery} name="query" placeholder="c.Make='Ford'"></textarea>
            </div>

            <div className="form-control end">
              <button disabled={selectedDataSet == null && !useQuery} className="app__load__query" onClick={this.onRequest}>Load Data</button>
            </div>
          </div>

          <div className="app__testing--actions">
            <button className="app__testing--new--dataset">Create new dataset</button>
            <button className="app__testing--new--item" onClick={this.createNewItem}>Create new item</button>
          </div>
        </aside>
        <div className="app__testing__data">
          <DataView updateCurrentItem={this.updateCurrentItem} data={currentItem} isLoading={isLoading}/>
          <div className="app__pagination">
            <button className="prev" onClick={this.prevPage}>Previous Item</button>
            {pages != null && pages > 0 ? <div className="pages">{currentPage + 1}/{pages}</div> : ''}
            <button className="next" onClick={this.nextPage}>Next Item</button>
          </div>
        </div>
      </div>
    )
  }
}
