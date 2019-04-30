import React, { Component } from 'react'
import Setting from './Setting';

// Redux
import { connect } from 'react-redux';
import { fetchOptions } from '../actions/optionsMethods'

class GlobalSettings extends Component {
  componentDidMount() {
    this.props.dispatch(fetchOptions())
  }

  render() {
    const options = this.props.options;
    return (
      <section className="app__global__settings">
        { options.map((option, i) => <Setting key={i} option={option} /> ) }
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    options: state.OptionReducer.options || []
  }
}

export default connect(mapStateToProps)(GlobalSettings);