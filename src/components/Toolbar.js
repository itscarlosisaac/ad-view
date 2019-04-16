import React, { Component } from 'react'
import ChromeSVG from './icons/Chrome'
import FFSVG from './icons/FF'
import IESVG from './icons/IE'
import HelpSVG from './icons/Help';

const { exec } = require('child_process');
const path = require('path');
export default class Toolbar extends Component {
  constructor(props){
    super(props);

    this.getActive = this.getActive.bind(this);
    // Browsers
    this.openChrome = this.openChrome.bind(this);
    this.openFirefox = this.openFirefox.bind(this);
    this.openEdge = this.openEdge.bind(this);
  }

  openChrome() {
    /*
    Chrome Mac: open -na "Google Chrome" --args --new-window "URL"
    */
   let url = this.getActive();
    if ( process.platform === 'darwin' ) {
      exec(`open -na "Google Chrome" --args --new-window "${url}"`, (error) => {
        if( error ) { console.log( error , 'The application could not be loaded'); }
      })
    // Chrome Windows
    }else if( process.platform === "win32") {
      exec(`start chrome "${url}"`, (error) => {
        if( error ) { console.log( error , 'The application could not be loaded'); }
      });
    }
  }

  openEdge() {
    let url = this.getActive();
    exec(`start microsoft-edge:"${url}"`, (error) => {
      if( error ) { console.log( error , 'The application could not be loaded'); }
    });
  }

  openFirefox() {
    /*
    Firefox Mac:
    */
   let url = this.getActive();
   const location = path.resolve(process.cwd(), 'shell/firefox.scpt');
    if ( process.platform === 'darwin' ) {
      exec(`osascript ${location} "${url}"`, (error) => {
        if( error ) { console.log( error , 'The application could not be loaded'); }
      })
    }else if( process.platform === "win32") {
      exec(`start firefox "${url}"`, (error) => {
        if( error ) { console.log( error , 'The application could not be loaded'); }
      });
    }
  }

  getActive(){
    if ( document.querySelector('.layoutHolder.active .view') !== null ){
      return URL = document.querySelector('.layoutHolder.active .view').attributes.url.value;
    }
    return '';
  }

  render() {
    
    return (
      <aside className="app__toolbar">
        <div className="app__browsers">
          <span onClick={this.openChrome}>
            <ChromeSVG/>
          </span>
          <FFSVG onClick={this.openFirefox}/>
          <IESVG onClick={this.openEdge}/>
        </div>
        <div className="app__help">
          <div className="help">
            <HelpSVG/>
            <small>Help</small>
          </div>
        </div>
      </aside>
    )
  }
}
