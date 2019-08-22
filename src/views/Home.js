import React, { Component, Fragment } from 'react'
import App from '../components/App';

export default class Home extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <App/>
      </Fragment>
    )
  }
}
