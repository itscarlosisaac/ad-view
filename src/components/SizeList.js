import React, { Component } from 'react'
import Size from './Size';

export default class SizeList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { sizes, update, deleteSize } = this.props;
    return (
      <div>
        {
          sizes.map((size, i) => {
            const { id } = size;
            const { width, height } = size.size;
            return (
              <Size
                key={i}
                id={id}
                size={{width, height}}
                update={update}
                deleteSize={deleteSize}
                isChecked={true}
                />
            )
          })
        }
      </div>
    )
  }
}
