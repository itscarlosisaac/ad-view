import React, { Component } from 'react'
import Size from './Size';

export default class SizeList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { sizes } = this.props;
    console.log("HOLA",sizes);
    return (
      <div>
        {
          sizes.map((size, i) => {
            const { width, height, id } = size.data;
            return <Size width={width} key={i} height={height} id={id} isChecked={true} />
          })
        }
      </div>
    )
  }
}
