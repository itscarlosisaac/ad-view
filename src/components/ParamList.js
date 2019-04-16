import React, { Component } from 'react'
import Param from './Param';

export default class ParamList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { params, update } = this.props;
    return (
      <div>
        {
          params.map((p, index) => {
            const { param:{name, value}, id } = p
            console.log(name, value, id)
            return (
              <Param key={index} name={p.param.name} value={p.param.value} id={p.id}/>
            )
          })
        }
      </div>
    )
  }
}
