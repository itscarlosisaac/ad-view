import React, { Component } from 'react'
import Logo from './Logo';
import validate from 'validate.js'
export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      protocol: "Http://",
      isOpen: false,
      url: "",
      validURL: false
    }
    this.toggleProtocol = this.toggleProtocol.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.validateURL = this.validateURL.bind(this);
  }
  componentWillMount() {
    this.setState({url: this.props.url})
  }
  
  toggleProtocol(e){
    const temp = this.state.isOpen;
    const protocol = e.target.dataset.protocol || this.state.protocol;
    this.props.getURL(protocol + this.state.url)
    this.setState({
      isOpen: !temp,
      protocol,
    });
  }

  toggleChange(e){
    const temp = e.target.value;
    this.validateURL(temp);
    this.setState({url: temp})
  }

  validateURL(e){
    const isValid = validate({website: this.state.protocol + e }, {
      website: {
        url: { allowLocal: true }
      }
    })

    if( isValid === undefined){
      this.setState({ validURL: true })
      this.props.getURL(this.state.protocol + e)
    }else {
      this.setState({ validURL: false })
    }
  }


  render() {
    const { protocol, isOpen, url } = this.state;
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
          <input className="input__url" type="url" placeholder="example.com" onChange={this.toggleChange} value={url}/>
        </div>
        <div className="action__container">
          <button className="btn__make__screen" disabled={!this.state.validURL} onClick={this.props.createViews}>
          Make Screens
          <span className="material-icons">send</span>
          </button>
        </div>
      </header>
    )
  }
}