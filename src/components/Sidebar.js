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

        <AddParam addParam={this.addParam}/>
        <ul>
          {
            this.state.params.map((i, index) => {
              return <li key={index}><span>{i.name}:</span><span>{i.value}</span><span>Remove</span></li>
            })
          }
        </ul>

        <div className="">
          <input type="checkbox" name="size-param" id="size-param" checked={this.state.sizeParam} onChange={this.toggleSizeParam} />
          <label htmlFor="size-param">Use size as a parameter</label>
        </div>

        <h3>Sizes</h3>

        <AddSizes addSize={this.addSize} />
        <ul>
          {
            this.state.sizes.map((i, index) => {
              return <li key={index}>{i.width}x{i.height} <span>Delete</span></li>
            })
          }
        </ul>
        <footer className="app__sidebar--footer">
          <Button cName="btn__create__screen" content="Create Screens" onClick={this.createWindow}/>
        </footer>
      </aside>
    )
  }
}
