import React, { Component } from 'react'

export default class View extends Component {
  render() {
    const styles = {
      display: 'inline-flex',
      width: this.props.width,
      height: this.props.height
    }
    return (
      <webview className="img" src={this.props.url} style={styles}></webview>
    )
  }
}
