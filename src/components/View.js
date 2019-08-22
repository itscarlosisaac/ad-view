import React, { Component } from 'react'
export default class View extends Component {

  render() {
    const styles = {
      display: 'inline-flex',
      width: this.props.width,
      height: this.props.height,
    }
    return (
      <div className="view" url={this.props.url} data-show-header= {this.props.showViewsHeader }>
        <webview
          id={`view-${this.props.width}x${this.props.height}`}
          src={this.props.url}
          style={styles}>
        </webview>
      </div>
    )
  }
}
