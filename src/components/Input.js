import React, { Component } from 'react'

export default class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      dirty: '',
    }
    this.onChange = this.onChange.bind(this)
    this.isDirty = this.isDirty.bind(this)
    this.resetField = this.resetField.bind(this)
  }

  onChange(e){
    const newState = e.target.value;
    const dirty = this.isDirty(newState)
    this.props.onUrlChange(newState);
    this.setState({
      value: newState,
      dirty,
    });
  }

  isDirty(v){
    return v !== '' ? 'dirty' : 'not-dirty';
  }

  resetField(){
    this.setState({value:"", isDirty: false});
  }

  render() {
    const { id, name, placeholder, type, resetField, required,  label } = this.props;
    const { value, dirty } = this.state;
    const klass = label !== '' ? "form-control has-label" : "form-control";
    return (
      <div className={klass}>
        { label ? <label htmlFor='{name}'>{label}:</label> : ''}
        { type == "number" ? <span>px</span> : ''}
        <input
          className={dirty}
          placeholder={placeholder}
          onChange={this.onChange}
          type={type}
          id={id}
          required={required}
          name={name}
          value={value}
          type={type}/>
      </div>
    )
  }
}

Input.defaultProps = {
  type: "text",
  label: '',
  resetField: () => {},
  onUrlChange: () => {}
}