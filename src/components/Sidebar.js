import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import AddParam from './AddParam';
import AddSizes from './AddSizes';
import View from './View';
import uuid from 'uuid';
import Emitter from '../emitter/emitter'
import validate from 'validate.js'

export default class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      params:[],
      sizeParam: true,
      sizes: [],
      url: '',
      validURL: false
    }

    this.addSize = this.addSize.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

    this.addParam = this.addParam.bind(this);
    this.deleteParam = this.deleteParam.bind(this);

    this.toggleSizeParam = this.toggleSizeParam.bind(this);
    this.createWindow = this.createWindow.bind(this);
    this.onUrlChange = this.onUrlChange.bind(this);
    this.getPositions = this.getPositions.bind(this);
    this.buildURL = this.buildURL.bind(this);
  }

  componentDidMount() {
    // this.props.store.clear();
    // this.getAllSizes();
    console.log(this.props.paramMethods)
  }

  componentDidUpdate(prevProps, prevState) {
    Emitter.newSizeEmitter.emit('new-size-added')
  }

  addParam(params){
    this.props.paramMethods.add(params);
  }

  deleteParam(e){
    this.props.paramMethods.delete(e);
  }
  
  addSize(size){
    this.props.sizeMethods.add(size);
  }
  
  deleteSize(e){
    this.props.sizeMethods.delete(e);
  }

  toggleSizeParam(){
    const newState = !this.state.sizeParam;
    this.setState({sizeParam: newState });
  }

  createWindow(){
    const { url , sizes, sizeParam } = this.state;
    const ProductionURL = new URL(url)

    if( sizeParam ){ ProductionURL.searchParams.append('size', '') }

    const Layouts =  sizes.map((t,index) => {
      const { width, height } = t.data;

      if( sizeParam ){ ProductionURL.searchParams.set('size',`${width}x${height}`); }

      return <View key={index} className="layoutHolder" url={ProductionURL.href} width={width} height={height}/>
    });
    this.props.views(Layouts)
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
    const isValid = validate({website: e }, {
      website: {
        url: { allowLocal: true }
      }
    })
    if( isValid === undefined){
      this.setState({ validURL: true })
      this.buildURL(e);
    }else {
      this.setState({ validURL: false })
    }
  }

  buildURL(e) {
    const { params } = this.state;
    let n = new URL( e );
    if ( params.length > 0){
      params.map(p => n.searchParams.append(p.param.name, p.param.value) );
    }
    console.log(n.href)
    this.setState({ url: n.href });
  }

  render() {
    const disabled = !this.state.validURL || this.state.sizes.length === 0;
    return (
      <aside className="app__sidebar">
        {/* <header className="app__sidebar--header">
          <Input onUrlChange={this.onUrlChange} placeholder="https://example.com" name="url" id="url" type="url"/>
          <p>
          <br />
          <span>
            { this.state.url }
          </span>
          </p>
        </header> */}

        <section className="app__params">
          <div className="app__sidebar--title">
            <span>Parameters</span>
          </div>
          <ul className="app__list">
            {
              this.props.params.map((i, index) => {
                return (
                  <li key={index} className="app__list--item">
                    <b className="param__name">{i.param.name}:</b>
                    <span className="param__value">{i.param.value}</span>
                    <i id={i.id} onClick={this.deleteParam} className="material-icons"> clear </i>
                  </li>
                )
              })
            }
          </ul>
          <AddParam addParam={this.addParam}/>
        </section>

        <section className="app__size__param hidden">
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
          <div className="app__sidebar--title">
            <span>Sizes</span>
          </div>
          <ul className="app__list" id="size__list">
            {
              this.props.sizes.map((i, index) => {
                return <li key={i.id} className="app__list--item">
                  <b>Width:</b> {i.data.width} 
                  <span>|</span>
                  <b>Height:</b> {i.data.height}
                <i
                  id={i.id}
                  className="material-icons"
                  onClick={this.deleteSize}>
                  clear
                  </i>
                </li>
              })
            }
          </ul>
          <AddSizes addSize={this.addSize} />
        </section>
      </aside>
    )
  }
}
