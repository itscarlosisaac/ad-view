import React, { Component, Fragment } from 'react'
import Size from './Size';
import SizeModel from '../models/SizeModel';

export default class SizeList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { sizes, update, deleteSize } = this.props;
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
                update={update}
                deleteSize={deleteSize}
                />
            )
          })
        }
      </Fragment>
    )
  }
}
