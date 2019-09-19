import React, { Component, Fragment } from 'react'
import { DotLoader } from 'react-spinners';
import Row from './Row';

export default class DataView extends Component {
  constructor(props){
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(){
    const { data, updateCurrentItem } = this.props;
    const Rows = [];
    let index = 0;
    if( data != {}){
      for( let key in data ){
        Rows.push(<Row updateCurrentItem={updateCurrentItem} k={key} v={data[key]} key={index} index={index} />)
        index++;
      }
    }
    return Rows;
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Fragment>
        <header className="dataview__header">
          <div className="dataview__header--title">
            <h2>Chevrolet Data Set</h2>
            <span>ab84ba12-3d10-48b5-ba24-46936a28f1e2</span>
          </div>
          <div className="dataview__header--actions">
            <button className="dataview__btn dataview__btn--primary">Save</button>
            <button className="dataview__btn dataview__btn--secondary">Delete Dataset</button>
          </div>
        </header>
        <section className="dataview__content">
          <div className="dataview__content--actions">
            <button>Add Property</button>
          </div>
          <h3>Request</h3>
          <div className={`${isLoading ? 'is_loading' : ''} dataview__content--rows`}>
            {
              isLoading
              ? <DotLoader sizeUnit={"px"} size={50} color={'#6979F8'} loading={isLoading} />
              : this.renderRow()
            }
          </div>
        </section>
      </Fragment>
    )
  }
}
