import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';

export default class addSizes extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    if ( e.target.elements[0].value !== "" &&
         e.target.elements[1].value !== "" ) {
      this.props.addSize({
        width: e.target.elements[0].value,
        height: e.target.elements[1].value
      })
    }
  }
  render() {
    return (
      <div>
        <form className="add__sizes" onSubmit={this.handleSubmit}>
          <Input  placeholder="Width" name="width" id="width" type="number"/>
          <Input placeholder="Height" name="height" id="height" type="number"/>
          <Button  cName="btn__addsize" content="Add Size" type="submit"/>
        </form>
      </div>
    )
  }
}
