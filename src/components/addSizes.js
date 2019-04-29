import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import validate from 'validate.js';

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

    const values = validate.collectFormValues(document.getElementById('add-size'))
    for( const v in values) {
      if( values[v] === null) {
        console.log("ERROR")
        this.addErrorClass(v);
      }
    }
    if ( values.width !== null &&
         values.height !== null ) {
      this.props.add(
        Number(e.target.elements[0].value),
        Number(e.target.elements[1].value)
      );
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
      <form
        id="add-size"
        className="input__row add__size"
        onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input label="W" ref={this.widthRef} name="width" id="width" type="number"/>
          <Input label="H" ref={this.heightRef} name="height" id="height" type="number"/>
        </div>
        <Button cName="btn btn__main--gray" content="Clear" type="clear"/>
        <Button cName="btn btn__main--orange" content="Add Size" type="submit"/>
      </form>
    )
  }
}
