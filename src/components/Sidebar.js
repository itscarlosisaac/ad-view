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

  render() {
    const disabled = !this.state.validURL || this.state.sizes.length === 0;
    return (
      <aside className="app__sidebar">

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
