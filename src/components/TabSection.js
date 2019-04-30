import React, { Component, Fragment } from 'react'
import Toggle from './icons/Toggle';

export default class TabSection extends Component {
  constructor(props) {
    super(props);
    this.toggleEditable = this.toggleEditable.bind(this);
  }

  toggleEditable(){
    this.props.toggle('size')
  }

  render() {
    const { title, components, is_editable, is_editing   } = this.props;

    return (
      <section className="app__tab__section">
        <div className="title">
          <span>{title}</span>
          { is_editable ?
            <span className="editable" onClick={this.toggleEditable}>
              {<Toggle state={is_editing}/>}
              <span>editable</span>
            </span>
          : '' }
        </div>
        <div className="app__tab__section--content">
          {
            components.map((component, i) => {
              return (
                <Fragment key={i}>
                  {component}
                </Fragment>
              )
            })
          }
        </div>
      </section>
    )
  }
}
