import React, { Component, Fragment } from 'react'
import Cell from './Cell';

export default class Row extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const { k, v, upadteCurrentItem, index  } = this.props;
    let isEmpty = v.length > 0;
    return (
      <Fragment>
        <p className={!isEmpty ? 'row row--emtpy' : 'row'}>
          <Cell name={`key-${index}`} upadteCurrentItem={upadteCurrentItem} value={k} />:
          <Cell name={`value-${index}`} upadteCurrentItem={upadteCurrentItem} value={v} />
        </p>
      </Fragment>
    )
  }
}
