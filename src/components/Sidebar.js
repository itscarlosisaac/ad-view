import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import AddParam from './AddParam';
import AddSizes from './AddSizes';
import createWindow from '../ipc/createWindow';
import uuid from 'uuid';
import { url } from 'url'
import Store from '../store/store';
import Emitter from '../emitter/emitter'

export default class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      params:[],
      sizeParam: true,
      sizes: [],
      url: 'http://localhost:9090/?immediate',
      buildUrl: ''
    }
    
    this.addSize = this.addSize.bind(this);
    this.getAllSizes = this.getAllSizes.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

    this.addParam = this.addParam.bind(this);
    this.getAllParams = this.getAllParams.bind(this);
    this.deleteParam = this.deleteParam.bind(this);

    this.toggleSizeParam = this.toggleSizeParam.bind(this);
    this.createWindow = this.createWindow.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.getPositions = this.getPositions.bind(this);
    this.buildURL = this.buildURL.bind(this);
  }

  componentDidMount() {
    // this.props.store.clear();
    this.getAllSizes();
    this.getAllParams();
  }

  componentDidUpdate(prevProps, prevState) {
    Emitter.newSizeEmitter.emit('new-size-added')
  }
  

  getAllSizes(){
    this.props.store.getAll().then(sizes => {
      this.setState({sizes})
    })
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
      this.getAllParams();
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

  toggleSizeParam(){
    const newState = !this.state.sizeParam;
    this.setState({sizeParam: newState });
  }

  createWindow(){
    const { url , sizes, sizeParam, buildUrl } = this.state;
    const ProductionURL = new URL(url)
    console.log("BUILD",buildUrl)
    Emitter.screenEmitter.emit('destroy-screens');
    
    if( sizeParam ){
      ProductionURL.searchParams.append('size', '')
    }
    sizes.map((t) => {
      const { width, height } = t.data;
      const { x, y } = this.getPositions({width, height});

      if( sizeParam ){ ProductionURL.searchParams.set('size',`${width}x${height}`); }

      createWindow(ProductionURL.href, width, height, x + 365, y + 60);
    });
    
  }

  getPositions (size) {
    const images = [...document.querySelectorAll('.screens .layoutHolder')];
    const img = images.filter( (img) => {
      const { offsetHeight, offsetWidth } = img
      return offsetWidth === size.width &&  offsetHeight === size.height
    })
    return {
        x: Number(img[0].style.left.replace('px', "")),
        y: Number(img[0].style.top.replace('px', ""))
      }
  }

  onUrlChange(e){
    this.buildURL();
    // this.setState({buildUrl: e})
  }

  buildURL() {
    const { url, params, sizeParam } = this.state;
    let n = new URL( url );
    console.log(params)
    if ( params.length > 0){
      params.map(p => n.searchParams.append(p.param.name, p.param.value) );
    }
    this.setState({ buildUrl: n.href })
  }

  render() {
    return (
      <aside className="app__sidebar">
        <header className="app__sidebar--header">
          <Input onUrlChange={this.onUrlChange} placeholder="https://example.com" name="url" id="url" type="url"/>
          <p>
          Preview Url 
          <br />
          <span>
            { this.state.buildUrl }
          </span>
          </p>
          
        </header>

        <section className="app__params">
          <h3>Parameters</h3>
          <ul className="app__param__list">
            {
              this.state.params.map((i, index) => {
                return <li key={index}>
                <span className="param__name">{i.param.name}:</span>
                <span className="param__value">{i.param.value}</span>
                <i 
                  id={i.id}
                  className="material-icons"
                  onClick={this.deleteParam}>
                  cancel
                  </i>
                </li>
              })
            }
          </ul>
          <AddParam addParam={this.addParam}/>
        </section>

        <section className="app__size__param">
          {/* <input type="checkbox" name="size-param" id="size-param" checked={this.state.sizeParam} onChange={this.toggleSizeParam} /> */}
          <p onClick={this.toggleSizeParam}>
          <span className="size__param">
          {
            this.state.sizeParam ? 
            <i className="material-icons on">check_box</i> : 
            <i className="material-icons off">check_box_outline_blank</i>
          }
          </span>
         Use size as a parameter</p>
         <small className="size__note">
           This is to use the size of the document as param from the url in combination with the sizes specified below. If not checked the size parameter will have to be specified in the parameters section.
         </small>
        </section>

        <section className="app__sizes">
          <h3>Sizes</h3>
          <ul className="app__size__list">
            {
              this.state.sizes.map((i, index) => {
                return <li key={i.id}>
                  {i.data.width}x{i.data.height}
                <i
                  id={i.id}
                  className="material-icons"
                  onClick={this.deleteSize}>
                  cancel
                  </i>
                </li>
              })
            }
          </ul>
          <AddSizes addSize={this.addSize} />
        </section>

        <footer className="app__sidebar--footer">
          <Button disabled={!this.state.url} cName="btn__create__screen" content="Create Screens" onClick={this.createWindow}/>
        </footer>
      </aside>
    )
  }
}
