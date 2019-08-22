import React, { Component } from 'react'
import toastr from 'toastr'

export default class DevToolsContainer extends Component {

  constructor(props){
    super(props);
    this.openDevTools = this.openDevTools.bind(this);
  }

  openDevTools() {
    const browserView = document.querySelector('.layoutHolder.active webview');
    if ( browserView ) {
      const devtoolsView = document.getElementById('devtools')
      const browser = browserView.getWebContents()
            // browser.setDevToolsWebContents(devtoolsView.getWebContents());
            browser.openDevTools({ mode: 'detach'})
    }else {
      toastr.error('Please select a view')
      return false;
    }
  }

  render() {
    return (
      <div id="dev-tools">
        <button className="dev__tools" onClick={this.openDevTools}>Open Development Tools</button>
      </div>
    )
  }
}


// http://localhost:9090
