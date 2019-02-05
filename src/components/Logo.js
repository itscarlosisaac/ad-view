import React, { Component } from 'react'
import image_src from '../img/Icon.png'
export default class Logo extends Component {
  render() {
    return (
      <div className="app__logo">
        <img src={image_src} width="40" alt="Main Logo"/>
        <span>Ad Viewer</span>
      </div>
    )
  }
}
