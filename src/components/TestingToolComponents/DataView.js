import React, { Component, Fragment } from 'react'
import Row from './Row';

export default class DataView extends Component {
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(){
    const { data, upadteCurrentItem } = this.props;
    const Rows = [];
    let index = 0;
    if( data != {}){
      for( let key in data ){
        Rows.push(<Row upadteCurrentItem={upadteCurrentItem} k={key} v={data[key]} key={index} index={index} />)
        index++;
      }
    }
    return Rows;
  }

  render() {
    return (
      <Fragment>
        {this.renderRow()}
      </Fragment>
    )
  }
}
