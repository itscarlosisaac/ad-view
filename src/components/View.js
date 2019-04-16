import React, { Component } from 'react'
const { exec } = require('child_process');
const path = require('path');

export default class View extends Component {

  render() {
    const styles = {
      display: 'inline-flex',
      width: this.props.width,
      height: this.props.height,
    }
    return (
      <div className="view" url={this.props.url}>
        <webview src={this.props.url} style={styles}></webview>
      </div>
    )
  }
}
