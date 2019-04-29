import Store from '../store/store';
import uuid from 'uuid';
import { ADD_SIZE, FETCH_SIZE } from '../actions/sizeActions';

const SizeReducer = ( state = [], {type, payload} ) => {
  switch(type) {
    case ADD_SIZE:
      const transformedPayload = transformSize(payload);
      Store.set(transformedPayload)
      return {
        ...state,
        sizes: [
          ...state.sizes,
          transformedPayload
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

const transformSize = (payload) => {
  return {
      id: uuid(),
      width: payload.width,
      height: payload.height,
      checked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
}

export default SizeReducer;