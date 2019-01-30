import '../assets/css/App.css'
import React, { Component } from 'react'
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
class App extends React.Component {
  render() {
    return (
      <div className="app__container">
        <Sidebar store={this.props.store}/>
        <ScreensContainer/>
      </div>
    )
  }
}

export default App
