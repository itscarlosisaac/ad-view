import '../assets/css/App.css'
import React, { Component } from 'react'

// Import components
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
import Header from './Header';

// Import helpers
import uuid from 'uuid';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: [],
      sizes: [],
      params: [],
      url: "",
      useSizeAsParam: true,
    }
    this.createViews = this.createViews.bind(this);
    this.getURL = this.getURL.bind(this);

    // Params Methods
    this.getAllParams = this.getAllParams.bind(this);
    this.addParam = this.addParam.bind(this);
    this.deleteParam = this.deleteParam.bind(this);
    
    // Size Methods
    this.getAllSizes = this.getAllSizes.bind(this);
    this.addSize = this.addSize.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

  }

  componentWillMount() {
    this.getAllParams();
    this.getAllSizes();
  }

  getAllParams(){
    this.props.store.getAllParams().then(params => {
      this.setState({params})
    })
  }

  addParam(params){
    const { name, value } = params
    this.props.store.setParam({
      id: uuid(),
      param: { name, value }
    }).then(() => {
      this.getAllParams();
    })
  }

  deleteParam(e){
    const id = e.currentTarget.id;
    this.props.store.deleteParam(id).then(()=>{
      console.log('Deleted:', id)
    }).then(() => {
      this.getAllParams();
    })
  }

  getAllSizes(){
    this.props.store.getAllSizes().then(sizes => {
      this.setState({sizes})
    })
  }

  addSize(size){
    const { width, height } = size;
    this.props.store.set({
      id: uuid(),
      data: {
        width: Number(width),
        height: Number(height),
      }
    }).then(() => {
      this.getAllSizes();
    });
  }

  deleteSize(e){
    const id = e.currentTarget.id;
    this.props.store.delete(id).then(()=>{
      console.log('Deleted:', id)
      this.getAllSizes();
    })
  }


  getURL(url){
    this.setState({url})
  }

  createViews(layout){
    this.setState({views:layout})
  }

  render() {
    return (
      <div className="app__container">
        <Header getURL={this.getURL}/>
        <Sidebar
          store={this.props.store}
          paramMethods={{add:this.addParam, delete: this.deleteParam}} 
          sizeMethods={{add:this.addSize, delete: this.deleteSize}} 
          params={this.state.params}
          sizes={this.state.sizes}
          views={this.createViews}
        />
        {/* <ScreensContainer store={this.props.store} views={this.state.views} /> */}
      </div>
    )
  }
}

export default App
