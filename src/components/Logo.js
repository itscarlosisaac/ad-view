import React, { Component } from 'react'
import AdViewerSVG from './icons/AdViewer';
export default class Logo extends Component {
  render() {
    return (
      <div className="app__logo">
        <AdViewerSVG/>
      </div>
    )
  }
}
