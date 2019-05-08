import React, { Component, Fragment } from 'react'
import Toggle from './icons/Toggle';

export default class TabSection extends Component {
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    const { is_editing, name } = this.props;
    const value = !is_editing
    this.props.toggle(name, value)
  }

  render() {
    const { title, components, is_editable, is_editing   } = this.props;

    return (
      <section className="app__tab__section">
        <div className="title">
          <span>{title}</span>
          { is_editable ?
            <span className="editable" onClick={this.toggle}>
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
