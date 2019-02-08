import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';

export default class addSizes extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.widthRef = React.createRef();
    this.heightRef = React.createRef();
  }

  handleSubmit(e){
    e.preventDefault();
    if ( e.target.elements[0].value !== "" &&
         e.target.elements[1].value !== "" ) {
      this.props.addSize({
        width: e.target.elements[0].value,
        height: e.target.elements[1].value
      });
      this.widthRef.current.resetField()
      this.heightRef.current.resetField()
    }
  }

  render() {
    return (
      <form className="input__row" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input ref={this.widthRef} placeholder="Width" name="width" id="width" type="number"/>
          <Input ref={this.heightRef} placeholder="Height" name="height" id="height" type="number"/>
        </div>
        <Button cName="btn primary" content="Add Size" type="submit"/>
      </form>
    )
  }
}
