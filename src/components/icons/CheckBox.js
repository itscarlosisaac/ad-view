import React, { Component } from 'react'

export default class CheckBox extends Component {

  constructor(props){
    super(props)
    this.state = {
      withArrow: <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="Main-App---Editable" transform="translate(-1155.000000, -369.000000)">
                          <g id="Group-3" transform="translate(1155.000000, 369.000000)">
                              <rect id="Rectangle-10-Copy" stroke="#313131" fill="#101010" fillRule="nonzero" x="0.5" y="0.5" width="13" height="13" rx="3"></rect>
                              <path d="M10.7168771,5.1367485 L10.7168771,5.1367485 C10.8994241,5.3192955 10.8995594,5.61522091 10.7171794,5.79793475 L6.77787032,9.7444549 C6.59553891,9.92712008 6.29992129,9.92712008 6.11758988,9.7444549 L4.13674856,7.75998756 C3.95441715,7.57732239 3.95441715,7.28116363 4.13674856,7.09849845 C4.31907997,6.91583328 4.61469759,6.91583328 4.797029,7.09849845 L6.4477301,8.75222123 L10.0562952,5.13705053 C10.2384597,4.95455254 10.5340771,4.95428222 10.7165751,5.13644675 C10.7166758,5.13654729 10.7167765,5.13664787 10.7168771,5.1367485 Z" id="selected" fill="#C3E88D"></path>
                          </g>
                      </g>
                  </g>
              </svg>,
      noArrow: <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Main-App---Editable" transform="translate(-1155.000000, -369.000000)">
                          <g id="Group-3" transform="translate(1155.000000, 369.000000)" fill="#101010" fill-rule="nonzero" stroke="#313131">
                              <rect id="Rectangle-10-Copy" x="0.5" y="0.5" width="13" height="13" rx="3"></rect>
                          </g>
                      </g>
                  </g>
              </svg>
    }
  }

  render() {
    const isChecked = this.props.isChecked;
    const { withArrow, noArrow } = this.state;
    return (
      <span className="checkbox">
        { isChecked ? withArrow : noArrow }
      </span>
    )
  }
}
