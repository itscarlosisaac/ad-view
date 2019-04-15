import React, { Component } from 'react'
import ChromeSVG from './icons/Chrome'
import FFSVG from './icons/FF'
import IESVG from './icons/IE'
import HelpSVG from './icons/Help';
export default class Toolbar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <aside className="app__toolbar">
        <div className="app__browsers">
          <ChromeSVG/>
          <FFSVG/>
          <IESVG/>
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
