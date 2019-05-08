import { ADD_SIZE, FETCH_SIZE, DELETE_SIZE } from '../actions/sizeActions';

function SizeReducer ( state = [], action ){
  switch(action.type) {
    case ADD_SIZE:
      return Object.assign({}, state, {
        sizes: state.sizes.concat(action.payload)
      })

    case FETCH_SIZE:
      return Object.assign({}, state, {
        sizes: action.payload
      })

    case DELETE_SIZE:
      const id = action.payload.id
      const remaining = state.sizes.filter(size => size.id !== id);
      return Object.assign({}, state, {
        sizes: remaining,
      })
    // Default
    default:
      return state
  }
}

export default SizeReducer;
