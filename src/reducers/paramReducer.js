import { ADD_PARAM, FECTH_PARAM } from '../actions/paramActions';

const ParamReducer = ( state = [], {type, payload} ) => {

  switch(type) {
    case ADD_PARAM:
      return Object.assign({}, state, {
        params: state.params.concat(payload)
      })

    case FECTH_PARAM:
    return Object.assign({}, state, {
      params: payload
    })

    // Default
    default:
      return state
  }
}

export default ParamReducer;
