import React, { Component, Fragment } from 'react'
import Size from './Size';
import { fetchSizes } from '../actions/sizeMethods'

// REDUX
import { connect } from 'react-redux';

class SizeList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchSizes())
    console.log(this.props.sizes)
  }

  render() {
    const { sizes, update, deleteSize } = this.props;
    return (
      <Fragment>
        {
          sizes.map((size, i) => {
            return <Size key={i} model={size} />
          })
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    sizes: state.SizeReducer.sizes || []
  };
}

export default connect(mapStateToProps)(SizeList);