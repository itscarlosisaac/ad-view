import React, { Component, Fragment } from 'react'
import validate from 'validate.js';

export default class AddProperty extends Component {
  constructor(props){
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onError = this.onError.bind(this);
    this.addErrorClass = this.addErrorClass.bind(this);
    this.cleanFields = this.cleanFields.bind(this);

    this.state = {
      error: null,
    }
  }

  onSubmit(e){
    e.preventDefault();
    const formValues = validate.collectFormValues(document.getElementById('add__property'));
    for( const v in formValues ){
      formValues[v] === null || undefined ? this.addErrorClass(v) : false;
    }

    if( formValues.value == null || formValues.property == null ) {
      this.onError();
    } else {
      const key = formValues.property;
      this.props.addProperty({[key]: formValues.value});
      this.cleanFields();
    }
  }

  onError(){
    this.setState({error: "All fields are required"})
  }

  addErrorClass(e){
    const element = document.getElementsByName(e)[0];
    element.classList.add('input__error')
    setTimeout(() => {element.classList.remove('input__error')}, 3000)
  }

  cleanFields(){
    document.getElementById("property").value = "";
    document.getElementById("value").value = "";
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit} id="add__property">
          <fieldset id="add-property">
            <h1 className="app__testing__title">Add Property</h1>
            <div className="app__input__row">
              <label>Property: </label>
              <input id="property" name="property" type="text" placeholder="Property" required />
            </div>
            <div className="app__input__row">
              <label>Value: </label>
              <input id="value" name="value" type="text" placeholder="Value" required />
            </div>
            </fieldset>
            <button disabled={this.props.isDisabled} onClick={this.onSubmit}>Add Property</button>
          <fieldset/>
        </form>
      </Fragment>
    )
  }
}
