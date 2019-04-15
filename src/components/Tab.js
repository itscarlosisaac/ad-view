import React, { Component } from 'react'

export default class Tab extends Component {

  constructor(props){
    super(props)

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const { label, onClick } = this.props;
    onClick(label);
  }
  
  render() {
    const { label } = this.props;
    const active = this.props.activeTab === label ? 'active' : '';
    return (
      <div className={`${active} app__tab`} onClick={this.onClick}>
        {this.props.icon}
      </div>
    )
  }
}
