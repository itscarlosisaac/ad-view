import React, { Component } from 'react'
import AddParam from './AddParam';
import Param from './Param';
import AddSizes from './AddSizes';

export default class Sidebar extends Component {
  constructor(props){
    super(props);

    this.addSize = this.addSize.bind(this);
    this.deleteSize = this.deleteSize.bind(this);

    this.addParam = this.addParam.bind(this);
    this.updateParam = this.updateParam.bind(this);
    this.deleteParam = this.deleteParam.bind(this);

  }

  addParam(params){
    this.props.paramMethods.add(params);
  }

  updateParam(params){
    this.props.paramMethods.update(params);
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

  render() {
    return (
      <aside className="app__sidebar">
        <div className="app__sidebar--title">
            <span>Options</span>
        </div>
        <section className="app__size__param">
          <p className="app__option" onClick={() => this.props.toggleParam('useSizeAsParam') }>
          {
            this.props.useSizeAsParam ?
            <i className="material-icons on">check_box</i> :
            <i className="material-icons off">check_box_outline_blank</i>
          }
         Use size as a parameter</p>
         <p className="app__option" onClick={() => this.props.toggleParam('usePreviewParam') }>
          {
            this.props.usePreviewParam ?
            <i className="material-icons on">check_box</i> :
            <i className="material-icons off">check_box_outline_blank</i>
          }
         Use provider preview parameter</p>
        </section>

        <section className="app__params">
          <div className="app__sidebar--title">
            <span>Parameters</span>
          </div>
          <ul className="app__list">
            {
              this.props.params.map((p, index) => {
                return (
                  <Param key={index} name={p.param.name} value={p.param.value} id={p.id} deleteParam={this.deleteParam} updateParam={this.updateParam} />
                )
              })
            }
          </ul>
          <AddParam addParam={this.addParam}/>
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
