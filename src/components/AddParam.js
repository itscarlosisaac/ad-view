import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';

export default class AddParam extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if ( e.target.elements[0].value !== "") {
      this.props.addParam({
        name: e.target.elements[0].value,
        value: e.target.elements[1].value === "" ? "true" : e.target.elements[1].value
      })
    }
  }

  render() {
    return (
      <form className="add__params" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input placeholder="Parameter Name" name="param-name" id="param-name"/>
          <Input placeholder="Parameter Value" name="param-value" id="param-value"/>
        </div>
        <Button type="submit" content="Add Param" cName="btn primary"/>
      </form>
    )
  }
}
