import '../assets/css/App.css'
import React, { Component } from 'react'
import Sidebar from './Sidebar';
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, From Electron!</h1>
        <Sidebar/>
        <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      </div>
    )
  }
}

export default App
