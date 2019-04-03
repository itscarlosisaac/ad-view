import React, { Component } from 'react'
import { FaFirefox, FaChrome, FaEdge } from 'react-icons/fa';
const { exec } = require('child_process');
const path = require('path');

export default class View extends Component {

  constructor(props){
    super(props);
    this.openChrome = this.openChrome.bind(this);
    this.openFirefox = this.openFirefox.bind(this);
    this.openEdge = this.openEdge.bind(this);
  }

  openChrome() {
    /*
    Chrome Mac:
    open -na "Google Chrome" --args --new-window "URL"
    */
    if ( process.platform === 'darwin' ) {
      exec(`open -na "Google Chrome" --args --new-window "${this.props.url}"`, (error) => {
        if( error ) {
          console.log( error , 'The application could not be loaded');
        }
      })
    // Chrome Windows
    }else if( process.platform === "win32") {
      exec(`start chrome "${this.props.url}"`, (error) => {
        if( error ) {
          console.log( error , 'The application could not be loaded');
        }
      });
    }
  }

  openFirefox() {
    /*
    Firefox Mac:
    */
   const location = path.resolve(process.cwd(), 'shell/firefox.scpt');
    if ( process.platform === 'darwin' ) {
      exec(`osascript ${location} "${this.props.url}"`, (error) => {
        if( error ) {
          console.log( error , 'The application could not be loaded');
        }
      })
    }else if( process.platform === "win32") {
      exec(`start firefox "${this.props.url}"`, (error) => {
        if( error ) {
          console.log( error , 'The application could not be loaded');
        }
      });
    }
  }

  openEdge() {
    exec(`start microsoft-edge:"${this.props.url}"`, (error) => {
      if( error ) {
        console.log( error , 'The application could not be loaded');
      }
    });
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
        <div className="open-in-browsers">
          <button onClick={this.openChrome}> <FaChrome size="2em" /> </button>
          <button onClick={this.openFirefox}> <FaFirefox size="2em" /> </button>
          {
            process.platform === 'win32' ? <button onClick={this.openEdge}> <FaEdge size="2em" /> </button> : ''
          }
        </div>
      </div>
    )
  }
}
