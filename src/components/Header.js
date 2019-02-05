import React, { Component } from 'react'
import Logo from './Logo';

export default class Header extends Component {
  render() {
    return (
      <header className="app__header">
        <Logo />
        <div className="input__container">
          <span className="input__protocol">
            Http://
            <svg width="11px" height="6px" viewBox="0 0 11 6" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Rectangle-4" transform="translate(0.000000, -5.000000)" fill="#FFFFFF" >
                  <polygon transform="translate(5.500000, 5.500000) rotate(45.000000) translate(-5.500000, -5.500000) " points="9 2 9 9 2 9"></polygon>
              </g>
          </svg>
          </span>
          <input className="input__url" type="url" placeholder="example.com"/>
        </div>
        <div className="action__container">
          <button className="btn__make__screen">Make Screens</button>
        </div>
      </header>
    )
  }
}
