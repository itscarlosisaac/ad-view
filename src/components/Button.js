import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    const { onClick, content, type } = this.props
    return (
      <div>
        <button type={type} onClick={onClick}>{content}</button>
      </div>
    )
  }
}
