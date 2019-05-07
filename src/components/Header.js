import React, { Component } from 'react'
import Logo from './Logo';
import SendSVG from './icons/Send';
import ReloadSVG from './icons/Reload';
import validate from 'validate.js'
export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      protocol: "Http://",
      isOpen: false,
      url: "",
      validURL: false,
    }
    this.toggleChange = this.toggleChange.bind(this);
    this.validateURL = this.validateURL.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadViews = this.reloadViews.bind(this);
  }

  componentWillMount() {
    this.setState({url: this.props.url})
  }

  reloadViews(){
    const views = document.querySelectorAll('webview');
    views.forEach(view => view.reload() );
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

  handleSubmit(e){
    e.preventDefault();
    this.props.createViews();
  }

  render() {
    const { protocol, url } = this.state;
    return (
      <header className="app__header">
        <Logo />
        <div className="input__container">
          <span className="input__protocol">
            {protocol}
          </span>
          <form id="form-url" onSubmit={this.handleSubmit}>
            <input className="input__url" type="url" placeholder="example.com" onChange={this.toggleChange} value={url}/>
          </form>
        </div>
        <div className="action__container">
          <button className="btn__h" onClick={this.props.createViews}>
            <SendSVG/>
            <span>Create Views</span>
          </button>
          <button className="btn__h" onClick={this.reloadViews}>
            <ReloadSVG/>
            <span>Reload Views</span>
          </button>
        </div>
      </header>
    )
  }
}
