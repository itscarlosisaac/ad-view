import React, { Component } from 'react'
const { shell } = require('electron');
const { spawn, exec } = require('child_process');


export default class View extends Component {

  constructor(props){
    super(props);
    this.openExternal = this.openExternal.bind(this);
  }

  openExternal() {
    /*
    Chrome Mac:
    open -na "Google Chrome" --args --new-window "URL"
    */
    // shell.openExternal('https://github.com')
    if ( process.platform === 'darwin' ) {
      console.log(spawn)
      exec(`open -na "Google Chrome" --args --new-window "${this.props.url}"`, (error) => {
        if( error ) {
          console.log( error , 'The application could not be loaded');
        }
      })
    }
  }

  render() {
    const styles = {
      display: 'inline-flex',
      width: this.props.width,
      height: this.props.height,
    }
    return (
      <div className="view">
        <webview className="img" src={this.props.url} style={styles}></webview>
        <button onClick={this.openExternal}>Open External</button>
      </div>
    )
  }
}
