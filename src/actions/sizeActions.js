export const ADD_SIZE = 'ADD_SIZE';
export const FETCH_SIZE = 'FETCH_SIZE';
export const UPDATE_SIZE = 'UPDATE_SIZE';

export const AddSizeAction = payload =>{
  return {
    type: ADD_SIZE,
    width: payload.width,
    height: payload.height
  }
}

export const FetchSizeAction = sizes => {
  return {
    type: FETCH_SIZE,
    payload: sizes
  }
}

export const UpdateSizeAction = size => {
  return {
    type: UPDATE_SIZE,
    payload: size
  }
}

