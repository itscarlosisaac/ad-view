import React, { Component } from 'react'
import CopySVG from './icons/Copy';

export default class Footer extends Component {
  render() {
    return (
      <footer className="app__footer">
        <div className="app__url__holder">
          <p>http://localhost:9090/?mod=Model:34830232</p>
        </div>
        <div className="app__copy__url">
          <CopySVG />
          <small>Copy Url</small>
        </div>
      </footer>
    )
  }
}
