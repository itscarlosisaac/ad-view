import '../assets/css/App.css'
import React, { Component } from 'react'

// Import components
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
import Header from './Header';
import View from './View';

// Import helpers
import uuid from 'uuid';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: [],
      sizes: [],
      params: [],
      url: "localhost:9090",
      useSizeAsParam: true,
    }

    // Header Methods
    this.createViews = this.createViews.bind(this);
    this.createWindows = this.createWindows.bind(this);
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
      this.getAllSizes();
    })
  }

  getURL(url){
    this.setState({url})
  }

  createViews(layout){
    this.setState({views:layout})
  }

  createWindows(){
    const { url , sizes, params } = this.state;
    const ProductionURL = new URL(url)
    if ( params.length > 0){
      params.map(p => ProductionURL.searchParams.append(p.param.name, p.param.value) );
    }
    const views =  sizes.map((t,index) => {
      const { width, height } = t.data;
      ProductionURL.searchParams.append('size', '') 
      ProductionURL.searchParams.set('size',`${width}x${height}`);
      return <View key={index} className="layoutHolder" url={ProductionURL.href} width={width} height={height}/>
    });
    this.setState({views})
  }

  render() {
    return (
      <div className="app__container">
        <Header 
          getURL={this.getURL}
          getProtocol={this.getProtocol}
          url={this.state.url}
          createWindows={this.createWindows}
        />
        <Sidebar
          store={this.props.store}
          paramMethods={{add:this.addParam, delete: this.deleteParam}}
          sizeMethods={{add:this.addSize, delete: this.deleteSize}}
          params={this.state.params}
          sizes={this.state.sizes}
          views={this.createViews}
        />
        <ScreensContainer store={this.props.store} views={this.state.views} />
      </div>
    )
  }
}

export default App
