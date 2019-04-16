import React, { Component } from 'react'

export default class TabSection extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { title, components } = this.props;
    return (
      <section className="app__tab__section">
        <div className="title">
          <span>{title}</span>
        </div>
        <div className="app__tab__section--content">
          {
            components.map((component, i) => {
              return (
                <div key={i}>
                  {component}
                </div>
              )
            })
          }
        </div>
      </section>
    )
  }
}
