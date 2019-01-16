import React, { Component } from 'react'
import Input from './Input';
export default class Sidebar extends Component {
  render() {
    return (
      <aside>
        <Input name="url" id="url"/>
      </aside>
    )
  }
}
