import Store from '../store/store';
import { ADD_SIZE, FETCH_SIZE, UPDATE_SIZE } from '../actions/sizeActions';

const SizeReducer = ( state = [], {type, payload} ) => {
  switch(type) {
    case ADD_SIZE:
      console.log(payload)
      return {
        ...state,
        sizes: [
          ...state.sizes,
          payload
        ]
      }

    case FETCH_SIZE:
      return {
        ...state,
        sizes: payload
      };
    // Default
    default:
      return state
  }
}

export default SizeReducer;