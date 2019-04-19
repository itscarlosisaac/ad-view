import React, { Component } from 'react'
import Input from './Input';
import Button from './Button';
import validate from 'validate.js';
import Emitter from '../emitter/emitter';

export default class addSizes extends Component {
  constructor(props){
    super(props);
    this.state = {
      is_disabled: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addErrorClass = this.addErrorClass.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);

    this.widthRef = React.createRef();
    this.heightRef = React.createRef();
  }

  changeEditMode(){
    const temp = this.state.is_disabled;
    this.setState({is_disabled: !temp})
  }

  componentDidMount() {
    Emitter.sizeEditableEmitter.on('toggle-edit', () => {
      this.changeEditMode()
    })
  }

  componentWillUnmount() {
    Emitter.sizeEditableEmitter.removeAllListeners('toggle-edit');
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
    const { is_disabled } = this.state;
    return (
      <form
        id="add-size"
        className="input__row add__size"
        onSubmit={this.handleSubmit}>
        <div className="inputs">
          <Input disabled={is_disabled} label="W" ref={this.widthRef} name="width" id="width" type="number"/>
          <Input disabled={is_disabled} label="H" ref={this.heightRef} name="height" id="height" type="number"/>
        </div>
        <Button disabled={is_disabled} cName="btn btn__main--gray" content="Clear" type="clear"/>
        <Button disabled={is_disabled} cName="btn btn__main--orange" content="Add Size" type="submit"/>
      </form>
    )
  }
}
