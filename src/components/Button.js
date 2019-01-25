import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    const { onClick, content, type, cName } = this.props
    return (
      <button className={cName} type={type} onClick={onClick}>
        {content}
      </button>
    )
  }
}
