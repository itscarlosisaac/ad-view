import '../assets/css/App.css'
import React, { Component } from 'react'
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
import Header from './Header';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: [],
      url: ""
    }
    this.createViews = this.createViews.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  getURL(url){
    this.setState({url})
  }

  createViews(layout){
    this.setState({views:layout})
  }

  render() {
    return (
      <div className="app__container">
        <Header getURL={this.getURL}/>
        <Sidebar store={this.props.store} views={this.createViews}/>
        <ScreensContainer store={this.props.store} views={this.state.views} />
      </div>
    )
  }
}

export default App
