import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';

export default class AddParam extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nameRef = React.createRef();
    this.valueRef = React.createRef();
  }

  handleSubmit(e){
    e.preventDefault();
    if ( e.target.elements[0].value !== "") {
      this.props.addParam({
        name: e.target.elements[0].value,
        value: e.target.elements[1].value === "" ? "true" : e.target.elements[1].value
      })
      this.nameRef.current.resetField()
      this.valueRef.current.resetField()
    }
  }

  render() {
    return (
      <form className="input__row" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input ref={this.nameRef} placeholder="Parameter Name" name="param-name" id="param-name"/>
          <Input ref={this.valueRef} placeholder="Parameter Value" name="param-value" id="param-value"/>
        </div>
        <Button type="submit" content="Add Param" cName="btn primary"/>
      </form>
    )
  }
}
