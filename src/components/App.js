import '../assets/css/App.css'
import React, { Component } from 'react'
import { ipcRenderer } from 'electron';

// Import components
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
import Header from './Header';
import View from './View';

// Import helpers
import uuid from 'uuid';
import Emitter from '../emitter/emitter'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: [],
      sizes: [],
      params: [],
      url: "",
      useSizeAsParam: true,
      usePreviewParam: true,
      viewsCreated: false
    }

    // Header Methods
    this.createViews = this.createViews.bind(this);
    this.reloadViews = this.reloadViews.bind(this);
    this.getURL = this.getURL.bind(this);

    // Params Methods
    this.getAllParams = this.getAllParams.bind(this);
    this.addParam = this.addParam.bind(this);
    this.deleteParam = this.deleteParam.bind(this);

    // USe size as Param
    this.toggleParam = this.toggleParam.bind(this)

    // Size Methods
    this.getAllSizes = this.getAllSizes.bind(this);
    this.addSize = this.addSize.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

    // Helper Methods
    this.instantiateEmitters = this.instantiateEmitters.bind(this)
  }

  componentWillMount() {
    this.getAllParams();
    this.getAllSizes();
    this.instantiateEmitters();
  }

  instantiateEmitters(){
    Emitter.screenEmitter.on('remove-screen', (e)=> {
      this.props.store.delete(e).then(e => this.getAllSizes() )

      process.nextTick(() => {
        const views = this.state.views.filter(v => v.props.id !== e);
        this.setState({views});
      });
    })

    ipcRenderer.on('create-views', () => {
      this.createViews();
    })
  }

  getAllParams(){
    this.props.store.getAllParams().then(params => {
      this.setState({params})
    })
  }

  reloadViews(){
    const views = document.querySelectorAll('webview');
    views.forEach(view => view.reload() );
  }

  addParam(params){
    const { name, value } = params
    let exists = this.state.params.filter(p => p.param.name === name && p.param.value === value );
    if( exists.length > 0 ) { return this.getAllParams() }
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
    let exists = this.state.sizes.filter(s => s.data.width === Number(width) && s.data.height === Number(height) );
    if( exists.length > 0 ) { return this.getAllSizes() }
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
    });

    process.nextTick(() => {
      const views = this.state.views.filter(v => v.props.id !== id);
      this.setState({views});
    });
  }

  toggleParam(param){
    const temp = !this.state[param];
    this.setState((prev) => {
      return {[param]: temp }; })
  }

  getURL(url){
    this.setState({url})
  }

  createViews(layout){
    this.setState({views:layout})
  }

  createViews(){
    const { url , sizes, params, useSizeAsParam, usePreviewParam } = this.state;
    const ProductionURL = new URL(url)
    if ( params.length > 0){
      params.map(p => ProductionURL.searchParams.append(p.param.name, p.param.value) );
    }

    if( usePreviewParam ) {
      ProductionURL.searchParams.append('provider', 'preview')
    }
    const views =  sizes.map((t,index) => {
      const id = t.id
      const { width, height,  } = t.data;
      if( useSizeAsParam ) {
        ProductionURL.searchParams.append('size', '')
        ProductionURL.searchParams.set('size',`${width}x${height}`);
      }
      return <View key={index} className="layoutHolder" id={id} url={ProductionURL.href} width={width} height={height}/>
    });
    this.setState({views})
  }

  render() {
    const { sizes, views, viewsCreated } = this.state;
    return (
      <div className="app__container">
        <Header
          getURL={this.getURL}
          getProtocol={this.getProtocol}
          url={this.state.url}
          createViews={this.createViews}
          reloadViews={this.reloadViews}
          viewsCreated={true}
        />
        <Sidebar
          useSizeAsParam={this.state.useSizeAsParam}
          usePreviewParam={this.state.usePreviewParam}
          toggleParam={this.toggleParam}
          store={this.props.store}
          paramMethods={{add:this.addParam, delete: this.deleteParam}}
          sizeMethods={{add:this.addSize, delete: this.deleteSize}}
          params={this.state.params}
          sizes={this.state.sizes}
          views={this.createViews}
        />
        <ScreensContainer sizes={sizes} views={views} />
      </div>
    )
  }
}

export default App
