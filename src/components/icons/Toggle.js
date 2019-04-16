import React, { Component } from 'react'

export default class Toggle extends Component {
  render() {
    const { state } = this.props;
    return (
      <svg width="19px" height="9px" viewBox="0 0 19 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {
          state ?
            <g id="on" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Switch-On" transform="translate(0.000000, -1.000000)" fillRule="nonzero">
                    <rect id="Rectangle-11" fill="#C3E88D" x="0" y="1" width="19" height="9" rx="4.5"></rect>
                    <rect id="Rectangle-11" fill="#3C5E0B" x="11" y="2" width="7" height="7" rx="3.5"></rect>
                </g>
            </g>
          :
            <g id="off" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Switch-Off" transform="translate(0.000000, -1.000000)" fillRule="nonzero">
                    <rect id="Rectangle-11" fill="#848484" x="0" y="1" width="19" height="9" rx="4.5"></rect>
                    <rect id="Rectangle-11" fill="#000000" x="1" y="2" width="7" height="7" rx="3.5"></rect>
                </g>
            </g>
          }
      </svg>
    )
  }
}


