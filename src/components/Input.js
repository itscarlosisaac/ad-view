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
    const { id, name, placeholder, type, resetField, required } = this.props;
    const { value, dirty } = this.state;
    return (
      <div className="form-control">
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
  resetField: () => {},
  onUrlChange: () => {}
}