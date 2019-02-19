import React, { Component } from 'react'

export default class Size extends Component {
  render() {
    const { width, height, id, deleteSize } = this.props
    return (
      <li className="app__list--item">
        <b>Width:</b> {width}
        <span>|</span>
        <b>Height:</b> {height}
        <i
          id={id}
          className="material-icons"
          onClick={deleteSize}>
          clear
        </i>
      </li>
    )
  }
}
