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
    const options = this.props.options[0];
    const optionsTags = [];
 
    for( const opt in options ) {
      if( opt !== "id" ) {
        optionsTags.push(
          <Setting
            name={opt}
            options={options}
            key={options[opt].label}
            option={options[opt]}
            id={options.id} />
        )
      }
    }
    return (
      <section className="app__global__settings">
        { optionsTags }
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