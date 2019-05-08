import React, { Component } from 'react'
import CopySVG from './icons/Copy';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app__footer">
        <div className="app__url__holder">
          <p>{this.props.url}</p>
        </div>
        <div className="app__copy__url">
          <CopySVG />
          <small>Copy Url</small>
        </div>
      </footer>
    )
  }
}
