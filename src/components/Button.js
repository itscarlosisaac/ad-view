import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    const { onClick, content, type, cName, disabled } = this.props
    return (
      <button disabled={disabled}  className={cName} type={type} onClick={onClick}>
        {content}
      </button>
    )
  }
}


Button.defaultProps = {
  disabled: false,
}