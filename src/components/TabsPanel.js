import React, { Component } from 'react'
import Tab from './Tab';
import AddParam from './AddParam';
import Param from './Param';
import AddSizes from './AddSizes';
import Size from './Size';

export default class TabsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
      // activeTab: this.props.activeTab | this.props.children[0].props.label
    }
    this.onClickTabItem = this.onClickTabItem.bind(this);
  }

  onClickTabItem(tab){
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div>
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
      </div>
      )
  }
}

