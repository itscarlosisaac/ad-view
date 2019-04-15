import React, { Component } from 'react'

export default class HelpSVG extends Component {
  render() {
    return (
      <svg width="27px" height="24px" viewBox="0 0 27 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <filter x="-31.6%" y="-43.8%" width="163.2%" height="187.5%" filterUnits="objectBoundingBox" id="filter-1">
                  <feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                  <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                  <feColorMatrix values="0 0 0 0 1   0 0 0 0 0.631372549   0 0 0 0 0.156862745  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
                  <feMerge>
                      <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
              </filter>
          </defs>
          <g id="Icon" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="LeftSidebar" transform="translate(-17.000000, -915.000000)" fillRule="nonzero">
                  <g id="Help" transform="translate(19.000000, 919.000000)">
                      <g id="Icon" filter="url(#filter-1)" transform="translate(2.000000, 0.000000)">
                          <polyline id="Path-2" stroke="#FFA128" strokeLinecap="round" strokeLinejoin="round" points="5.18475239 15.53 0.748484848 15.53 9.29626616 0.33 18.2515152 15.53 13.719878 15.53"></polyline>
                          <path d="M8.74,9.31 L8.74,7.98 C8.74,7.56026359 9.08026359,7.22 9.5,7.22 C9.91973641,7.22 10.26,7.56026359 10.26,7.98 L10.26,9.31 L10.26,10.6955713 L10.26,11.78 C10.26,12.1997364 9.91973641,12.54 9.5,12.54 C9.08026359,12.54 8.74,12.1997364 8.74,11.78 L8.74,10.6955713 L8.74,9.31 Z M9.5,14.82 C9.08026359,14.82 8.74,14.4797364 8.74,14.06 C8.74,13.6402636 9.08026359,13.3 9.5,13.3 C9.91973641,13.3 10.26,13.6402636 10.26,14.06 C10.26,14.4797364 9.91973641,14.82 9.5,14.82 Z" id="Combined-Shape" fill="#FFA128"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg>
    )
  }
}