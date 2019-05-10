import React, { Component, Fragment } from 'react'
import Tab from './Tab';

// Import Emitters
import Emitter from '../emitter/emitter'

export default class TabsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    }
    this.onClickTabItem = this.onClickTabItem.bind(this);
  }

  componentDidMount() {
    Emitter.ShortcutEmitter.on('show-sizes', () => this.onClickTabItem('size') );
    Emitter.ShortcutEmitter.on('show-params', () => this.onClickTabItem('params') );
    Emitter.ShortcutEmitter.on('show-settings', () => this.onClickTabItem('settings') );
  }


  onClickTabItem(tab){
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <Fragment>
          <div className="app__tabs">
          {
            this.props.children.map((child) => {
              const { label, icon } = child.props;
              return (
                <Tab
                  activeTab={activeTab}
                  icon={icon}
                  label={label}
                  key={label}
                  onClick={this.onClickTabItem}
                />
              )
            })
          }
        </div>
        <div className="app__tab__content">
            {this.props.children.map((child) => {
              if (child.props.label !== activeTab) return undefined;
              return child.props.children
            })}
          </div>
      </Fragment>
      )
  }
}

