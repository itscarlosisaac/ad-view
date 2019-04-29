import React, { Component, Fragment } from 'react'
import Size from './Size';
import SizeModel from '../models/SizeModel';
import { fetchSizes } from '../actions/sizeActions'

// REDUX
import { connect } from 'react-redux';

class SizeList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchSizes())
  }

  render() {
    const { sizes, update, deleteSize } = this.props;
    console.log(sizes)
    return (
      <Fragment>
        {
          sizes.map((size, i) => {
            const { id, width, height, checked } = size
            const sizeModel = new SizeModel( id, width, height, checked );
            return (
              <Size
                key={i}
                model={sizeModel}
                update={() => { console.log(this)}}
                deleteSize={() => {}}
                />
            )
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