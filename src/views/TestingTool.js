import React, { Component } from 'react'
import axios from 'axios';
import validate from 'validate.js';

export default class TestingTool extends Component {
  constructor(props){
    super(props)
    this.onRequest = this.onRequest.bind(this);
    this.jsonView = this.jsonView.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.submitParams = this.submitParams.bind(this);
    this.removeParam = this.removeParam.bind(this);
    this.parseData = this.parseData.bind(this);
    this.encodeURL = this.encodeURL.bind(this);

    // Pagination
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

    this.state = {
      // url: 'https://record-store.azurewebsites.net/api/records?where=c.Make%3D%27Genesis%27',
      url: 'https://record-store.azurewebsites.net/api/records',
      response: null,
      error: null,
      params: [{parameter: "c.Make", value: "'Genesis'"}],
      pages: null,
      currentPage: 0
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
          pages: response.data.length
        })
      })
      .catch(function (error) {
        // handle error
        self.setState({error: error})
      })
  }

  encodeURL(APIURL){
    const query = validate.collectFormValues(document.getElementById('app__testing__query'));
    for( const q in query ) {
      if( query[q] != null){
        console.log(q)
        if( q == `c\\\\.Make` ) {
          APIURL.searchParams.append(q.replace("\\\\", ""), `"${query[q]}"`)
        }else {
          APIURL.searchParams.append(q.replace("\\\\", ""), query[q])
        }
      }
    }
    console.log(APIURL)
    APIURL.search = "?where=" + APIURL.search.slice(1,APIURL.search.length);
    return APIURL;
  }

  onSubmit(e){
    e.preventDefault();
    const values = validate.collectFormValues(document.getElementById('add-param'));
    for( const v in values ){
      values[v] === null || undefined ? this.addErrorClass(v) : false;
    }
    if ( values.name !== null && values.value !== null ) {
      this.submitParams(values);
    }
  }

  addErrorClass(e){
    const element = document.getElementsByName(e)[0];
    element.classList.add('input__error')
    setTimeout(() => {element.classList.remove('input__error')}, 3000)
  }

  submitParams(param) {
    const payload = {
      active: true,
      parameter: param.parameter,
      value: param.value,
    }
    const newParams = this.state;
    newParams.push(payload)
    this.setState({ params: newParams })
  }

  nextPage(){
    const { currentPage, pages } = this.state;
    if( currentPage == pages - 1 ) return;
    this.setState({currentPage: currentPage + 1})
  }

  prevPage() {
    const { currentPage } = this.state;
    if( currentPage == 0 ) return;
    this.setState({currentPage: currentPage - 1})
  }

  jsonView(){

    const {error, response, currentPage} = this.state;
    let row = null;
    if( response != null ) row = this.parseData(response[currentPage]);

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
  parseData(object){
    const DisplayItem = [];
    let index = 0;
    let isEmpty = true;
    for( let param in object ) {
      isEmpty = object[param].length > 0;
      DisplayItem.push(
        <p className={!isEmpty ? 'row row--emtpy' : 'row'} key={index}>
          <span className="name">{param}:</span>
          <span className="details">{object[param]}</span>
        </p>);
      index++
    }
    return DisplayItem;
  }

  removeParam(index) {
  //   const copy = this.state.params;
  //   copy.splice(index, 1);
  //   this.setState({params: copy });
  }

  render() {
    console.log(this.state)
    const {params, pages, currentPage} = this.state;
    return (
      <div className="app__testing">
        <aside className="app__testing__form">
          <header className="app__testing__query" id="app__testing__query">
            <h1 className="app__testing__title">Query Settings</h1>
            <div className="app__input__row">
              <label>Make: </label>
              <input name="c.Make" type="text" placeholder="Chevrolet"/>
            </div>
            <div className="app__input__row">
              <label>Query: </label>
              <textarea name="Query"  placeholder="Query"></textarea>
            </div>
            <button className="app__load__query" onClick={this.onRequest}>Load Live Data</button>
          </header>

          <form onSubmit={this.onSubmit}>
            <fieldset id="add-param">
              <h1 className="app__testing__title">Add Property</h1>
              <div className="app__input__row">
                <label>Property: </label>
                <input name="property" type="text" placeholder="Property"/>
              </div>
              <div className="app__input__row">
                <label>Value: </label>
                <input name="value" type="text" placeholder="Value"/>
              </div>
              </fieldset>
              <button onClick={this.addParam}>Add Parameter</button>
            <fieldset/>
          </form>
          <hr/>
          <div className="app__testing__params">
              {params.map((param, index) => {
                return (
                  <div key={index}>
                    <span className="name">{param.parameter}:</span>
                    <span className="value">{param.value}</span>
                    <span onClick={()=>{this.removeParam(index)}}>Remove</span>
                  </div>
                )
              })}

            </div>
        </aside>
        <div className="app__testing__data">
          { pages != null ?  (
            <div className="app__testing__content">
              <h3>Data Set</h3>
              {this.jsonView()}
            </div>
          ) : <div className="app__testing__content">
                <h3>No Data</h3>
              </div>}
          <div className="app__pagination">
            <button className="prev" onClick={this.prevPage}>Previous Page</button>
            {pages != null ? <div className="pages">{currentPage + 1}/{pages}</div> : ''}
            <button className="next" onClick={this.nextPage}>Next Page</button>
          </div>
        </div>
      </div>
    )
  }
}
