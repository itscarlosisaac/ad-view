import { ADD_OPTION, FETCH_OPTION, UPDATE_OPTION } from '../actions/optionsActions';

const OptionReducer = ( state = {} , { type, payload } ) => {
  switch (type) {
    case ADD_OPTION:
      return Object.assign({state}, payload)

    case FETCH_OPTION:
    return Object.assign({}, state, {
      options: payload
    })

    case UPDATE_OPTION:
      return Object.assign({state}, payload)
    break;

    default:
      return state;
  }
}

export default OptionReducer;
