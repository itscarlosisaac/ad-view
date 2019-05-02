import { ADD_SIZE, FETCH_SIZE, DELETE_SIZE } from '../actions/sizeActions';

const SizeReducer = ( state = [], {type, payload} ) => {
  switch(type) {
    case ADD_SIZE:
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

    case DELETE_SIZE:
    const id = payload.id
    const remaining = state.sizes.filter((size) => size.id !== id);
    console.log(state, remaining)
    return {
      ...state,
      sizes: remaining
    }
    // Default
    default:
      return state
  }
}

export default SizeReducer;