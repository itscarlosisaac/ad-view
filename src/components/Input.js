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
  render() {
    const { id, name, placeholder, type } = this.props;
    const { value, dirty } = this.state;
    return (
      <div className="form-control">
        <input className={dirty} placeholder={placeholder} onChange={this.onChange} type="text" id={id} name={name} value={value} type={type}/>
      </div>
    )
  }
}

Input.defaultProps = {
  type: "text",
  onUrlChange: () => {}
}