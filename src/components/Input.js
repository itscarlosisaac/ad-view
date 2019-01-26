import React, { Component } from 'react'

export default class Input extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
    this.onChange = this.onChange.bind(this)
  }
  onChange(e){
    const newState = e.target.value;
    this.setState({value: newState})
    this.props.onUrlChange(this.state.value);
  }
  render() {
    const { id, name, placeholder, type } = this.props;
    const { value } = this.state;
    return (
      <div className="form-control">
        <input placeholder={placeholder} onChange={this.onChange} type="text" id={id} name={name} value={value} type={type}/>
      </div>
    )
  }
}

Input.defaultProps = {
  type: "text",
  onUrlChange: () => {}
}