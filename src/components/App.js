import '../assets/css/App.css'
import React, { Component } from 'react'
import ScreensContainer from './ScreensContainer';
import Sidebar from './Sidebar';
import View from './View';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      views: []
    }
    this.createViews = this.createViews.bind(this);
  }

  createViews(layout){
    this.setState({views:layout})
    // return <View className="layoutHolder" url={url} width={w} height={h}/>
  }

  render() {
    return (
      <div className="app__container">
        <Sidebar store={this.props.store} views={this.createViews}/>
        <ScreensContainer store={this.props.store} views={this.state.views} />
      </div>
    )
  }
}

export default App
