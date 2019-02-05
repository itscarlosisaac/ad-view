import React, { Component } from 'react'
import Logo from './Logo';

export default class Header extends Component {
  render() {
    return (
      <header className="app__header">
        <Logo />
        <div>
          <h1>URL</h1>
        </div>
        <div className="">
          <button className="btn__make__screen">Make Screens</button>
        </div>
      </header>
    )
  }
}
