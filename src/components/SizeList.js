import React, { Component } from 'react'
import Size from './Size';

export default class SizeList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { sizes, update } = this.props;
    return (
      <div>
        {
          sizes.map((size, i) => {
            const { id } = size;
            const { width, height } = size.size;
            return (
              <Size update={update} size={{width, height}} key={i} id={id} isChecked={true} />
            )
          })
        }
      </div>
    )
  }
}
