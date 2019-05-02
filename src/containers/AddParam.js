import React, { Component } from 'react'
import validate from 'validate.js';

// REDUX
import { AddParamAction } from '../actions/paramActions';
import { addParam } from '../actions/paramMethods';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

class AddParam extends Component {
  constructor(props) {
    super(props)
    this.onAddParam = this.onAddParam.bind(this);
    this.submitParams = this.submitParams.bind(this);
    this.addErrorClass = this.addErrorClass.bind(this);
    this.clearForms = this.clearForms.bind(this);

    // Refs
    this.name = React.createRef();
    this.value = React.createRef();
  }

  onAddParam(e){
    e.preventDefault();
    const values = validate.collectFormValues(document.getElementById('add-param'));
    for( const v in values ){
      values[v] === null ? this.addErrorClass(v) : false;
    }
    if ( values.name !== null && values.value !== null ) {
      this.submitParams(values);
    }
  }

  submitParams(param) {
    const payload = {
      name: param.name,
      value: param.value,
    }
    this.clearForms();

    this.props.dispatch(addParam(payload));
  }

  addErrorClass(e){
    const element = document.getElementsByName(e)[0];
    element.classList.add('input__error')
    setTimeout(() => {element.classList.remove('input__error')}, 3000)
  }

  clearForms(){
    // this.name.current.resetField();
    // this.value.current.resetField();
    // this.name.current.field.current.focus()
  }

  render() {
    return (
      <div>
        <form
          id="add-param"
          className="input__row add__size"
          onSubmit={this.onAddParam}>
          <div className="inputs inputs--vertical">
            <Input ref={this.name} placeholder="Name" name="name" id="name" type="text"/>
            {/* <Input ref={this.value} placeholder="Value" name="value" id="value" type="text"/> */}
            <div className="form-control">
              <textarea ref={this.value} placeholder="Value" name="value" id="value" ></textarea>
            </div>
          </div>
          <Button cName="btn btn__main--gray" content="Clear" type="clear"/>
          <Button cName="btn btn__main--orange" content="Add Param" type="submit"/>
        </form>
      </div>
    )
  }
}

const mapActionsToProps = (dispatch) => {
  return bindActionCreators({
    onAddParam: AddParamAction
  }, dispatch )
}

export default connect(mapActionsToProps)(AddParam);