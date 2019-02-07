import React, { Component } from 'react'
import Logo from './Logo';

export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      protocol: "Http://",
      isOpen: true,
    }
    this.toggleProtocol = this.toggleProtocol.bind(this);
  }

  toggleProtocol(e){
    const temp = this.state.isOpen;
    const protocol = e.target.dataset.protocol || this.state.protocol;
    this.setState({
      isOpen: !temp,
      protocol,
    });
  }

  render() {
    const { protocol, isOpen } = this.state;
    return (
      <header className="app__header">
        <Logo />
        <div className="input__container">
          <span className="input__protocol" onClick={this.toggleProtocol}>
            {protocol}
            <svg width="11px" height="6px" viewBox="0 0 11 6" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g id="Rectangle-4" transform="translate(0.000000, -5.000000)" fill="#FFFFFF" >
                  <polygon transform="translate(5.500000, 5.500000) rotate(45.000000) translate(-5.500000, -5.500000) " points="9 2 9 9 2 9"></polygon>
              </g>
            </svg>
            {
              isOpen ?
              ( <ul className="input__protocol__list">
                <li data-protocol="Http://">Http</li>
                <li data-protocol="Https://">Https</li>
              </ul> ) : ""
            }
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