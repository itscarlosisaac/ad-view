import React, { Component, Fragment } from 'react'
import Toggle from './icons/Toggle';
import Emitter from '../emitter/emitter'

export default class TabSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      isEditing: false,
    }
    this.toggleEditable = this.toggleEditable.bind(this);
  }

  toggleEditable(){
    const prevState = this.state.editable;
    Emitter.sizeEditableEmitter.emit('toggle-edit', !prevState)
    this.setState({editable: !prevState});
  }

  render() {
    const { title, components, editable } = this.props;

    return (
      <section className="app__tab__section">
        <div className="title">
          <span>{title}</span>
          { editable ?
            <span className="editable" onClick={this.toggleEditable}>
              {<Toggle state={this.state.editable}/>}
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
