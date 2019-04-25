import uuid from 'uuid';

export function AddSizeAction(payload){
  return {
    type: 'ADD_SIZE',
    width: payload.width,
    height: payload.height
  }
}