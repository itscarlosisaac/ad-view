import React, { Component, Fragment } from 'react'
import Param from './Param';
import  { fetchParams } from '../actions/paramMethods';

import { connect } from 'react-redux';

class ParamList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchParams())
  }

  render() {
    const { params, is_editing } = this.props;
    return (
      <Fragment>
        { params.map((param, i) => <Param key={i} is_editing={is_editing} model={param} /> ) }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    params: state.ParamReducer.params || []
  }
}

export default  connect(mapStateToProps)(ParamList)
