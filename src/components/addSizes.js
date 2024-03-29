import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import validate from 'validate.js'

export default class addSizes extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addErrorClass = this.addErrorClass.bind(this);

    this.widthRef = React.createRef();
    this.heightRef = React.createRef();
  }

  handleSubmit(e){
    e.preventDefault();
    let empty = false;
    const values = validate.collectFormValues(document.getElementById('add-size'))
    for( const v in values) {
      if( values[v] === null) { 
        empty = true
        this.addErrorClass(v);
      }
    }
    if ( values.width !== null &&
         values.height !== null ) {
      this.props.addSize({
        width: e.target.elements[0].value,
        height: e.target.elements[1].value
      });
      this.widthRef.current.resetField()
      this.heightRef.current.resetField()
    }
  }

  addErrorClass(e){
    const element = document.getElementsByName(e)[0];
    element.classList.add('input__error')
    setTimeout(() => {element.classList.remove('input__error')}, 3000)
  }

  render() {
    return (
      <form id="add-size" className="input__row" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input ref={this.widthRef} placeholder="Width" name="width" id="width" type="number"/>
          <Input ref={this.heightRef} placeholder="Height" name="height" id="height" type="number"/>
        </div>
        <Button cName="btn primary" content="Add Size" type="submit"/>
      </form>
    )
  }
}
