import { ADD_PARAM, FECTH_PARAM } from '../actions/paramActions';

const ParamReducer = ( state = [], {type, payload} ) => {

  switch(type) {
    case ADD_PARAM:
      return {
        ...state,
        params: [
          ...state.params,
          payload
        ]
      }

    case FECTH_PARAM:
      return {
        ...state,
        params: payload
      };

    // Default
    default:
      return state
  }
}

export default ParamReducer;