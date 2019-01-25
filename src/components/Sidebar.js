import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import AddParam from './AddParam';
import AddSizes from './AddSizes';
import createWindow from '../ipc/createWindow';

export default class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      params:[],
      sizeParam: true,
      sizes: []
    }
    this.addSize = this.addSize.bind(this);
    this.addParam = this.addParam.bind(this);
    this.toggleSizeParam = this.toggleSizeParam.bind(this);
    this.createWindow = this.createWindow.bind(this);
  }

  addParam(params){
    const oldParams = this.state.params
    console.log(this.state)
    this.setState({params: [...oldParams, params]})
  }

  addSize(size){
    const oldSizes = this.state.sizes
    console.log(this.state)
    this.setState({sizes: [...oldSizes, size]})
  }

  toggleSizeParam(){
    const newState = !this.state.sizeParam;
    this.setState({sizeParam: newState });
  }

  createWindow(){
    createWindow('http://www.youtube.com', 500, 300)
  }

  render() {
    return (
      <aside className="app__sidebar">
        <header className="app__sidebar--header">
          <Input placeholder="Url" name="url" id="url"/>
        </header>

        <section className="app__params">
          <h3>Parameters</h3>
          <ul className="app__param__list">
            {
              this.state.params.map((i, index) => {
                return <li key={index}>
                <span className="param__name">{i.name}:</span>
                <span className="param__value">{i.value}</span>
                <i className="material-icons">cancel</i>
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
                return <li key={index}>{i.width}x{i.height} 
                <i className="material-icons">cancel</i>
                </li>
              })
            }
          </ul>
          <AddSizes addSize={this.addSize} />
        </section>


        <footer className="app__sidebar--footer">
          <Button cName="btn__create__screen" content="Create Screens" onClick={this.createWindow}/>
        </footer>
      </aside>
    )
  }
}
