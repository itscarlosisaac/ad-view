import React, { Component } from 'react'
import Param from './Param';

export default class ParamList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { params, update, deleteParam } = this.props;
    return (
      <div>
        {
          params.map((p, index) => {
            const { param:{name, value} } = p
            return (
              <Param
                key={index}
                update={update}
                deleteParam={deleteParam}
                name={p.param.name}
                value={p.param.value}
                id={p.id}
                />
            )
          })
        }
      </div>
    )
  }
}
