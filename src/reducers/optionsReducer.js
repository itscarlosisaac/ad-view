import { ADD_OPTION, FETCH_OPTION, UPDATE_OPTION } from '../actions/optionsActions';

const OptionReducer = ( state = {} , { type, payload } ) => {
  switch (type) {
    case ADD_OPTION:
      return {
        ...state,
        payload
      }
    break;

    case FETCH_OPTION:
      return {
        options: payload
      }
    break;

    case UPDATE_OPTION:
      return {
        ...state,
         payload
      }
    break;

    default:
      return state;
      break;
  }
}

export default OptionReducer;