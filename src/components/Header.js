import React, { Component } from 'react'
import Logo from './Logo';
import SendSVG from './icons/Send';
import ReloadSVG from './icons/Reload';
import validate from 'validate.js'
import toastr from 'toastr'

// Import Emitters
import Emitter from '../emitter/emitter'

export default class Header extends Component {

  constructor(props){
    super(props);
    this.state = {
      url: "",
      validURL: false,
    }
    this.toggleChange = this.toggleChange.bind(this);
    this.validateURL = this.validateURL.bind(this);
    this.addErrorClass = this.addErrorClass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reloadViews = this.reloadViews.bind(this);
  }

  componentDidMount() {
    this.setState({url: this.props.url})
    Emitter.ShortcutEmitter.on('reload-views', () => {
      this.reloadViews();
    });

    Emitter.ShortcutEmitter.on('create-views', (e) => {
      this.handleSubmit(e = {preventDefault: () => {}})
    });
  }

  reloadViews(){
    const views = document.querySelectorAll('webview');
    views.forEach(view => view.reload() );
  }

  toggleChange(e){
    const temp = e.target.value;
    this.setState({url: temp})
  }

  validateURL(e){
    const webConstraint = {
      website: {
        url: {
          allowLocal: true
        }
      }
    }
    const isValid = validate({website: e}, webConstraint);

    if( isValid === undefined ) { return true; }
    return false;
  }

  addErrorClass(){
    const element = document.querySelector("#form-url .input__url");
    element.classList.add('input__error')
    setTimeout(() => {element.classList.remove('input__error')}, 3000)
  }

  handleSubmit(e){
    e.preventDefault();
    const URL = validate.collectFormValues(document.querySelector('form#form-url')).url;
    const urlValid = this.validateURL(URL);

    if( urlValid && URL !== null ) {
      this.setState({ validURL: true })
      this.props.getURL(URL)
      process.nextTick(() => this.props.createViews() );
    } else {
      toastr.error('Please insert a valid URL')
    }
  }

  render() {
    const { url } = this.state;
    return (
      <header className="app__header">
        <Logo />
        <div className="input__container">
          <form id="form-url" onSubmit={this.handleSubmit}>
            <input name="url" className="input__url" type="url" placeholder="http://www.example.com" onChange={this.toggleChange} value={url}/>
          </form>
        </div>
        <div className="action__container">
          <button className="btn__h" onClick={this.handleSubmit}>
            <SendSVG/> <span>Create Views</span>
          </button>
          <button className="btn__h" onClick={this.reloadViews}>
            <ReloadSVG/> <span>Reload Views</span>
          </button>
        </div>
      </header>
    )
  }
}
