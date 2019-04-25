import Store from '../store/store';
import uuid from 'uuid';

// let InitialState = [];
let InitialState = [];
Store.getAllSizes().then( r => InitialState.push(...r));
console.log("HEY", InitialState);

const Sizes = ( state = InitialState, {type, payload} ) => {
  switch(type) {
    case 'ADD_SIZE':
    const transformedPayload = transformSize(payload);
      Store.set(transformedPayload)
      return [
        ...state,
        transformedPayload
      ]
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

export default Sizes;