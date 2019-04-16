import React, { Component } from 'react'
import Checkbox from './icons/CheckBox';

export default class GlobalSettings extends Component {
  render() {
    return (
      <section className="app__global__settings">
        <div className="app__global__settings-item">
          <Checkbox isChecked={true} />
          <span className="label"> Use size as parameter </span>
        </div>
        <div className="app__global__settings-item">
          <Checkbox isChecked={true} />
          <span className="label">Use provider preview as parameter</span>
        </div>
      </section>
    )
  }
}
