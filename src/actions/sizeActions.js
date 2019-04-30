export const ADD_SIZE = 'ADD_SIZE';
export const FETCH_SIZE = 'FETCH_SIZE';
export const UPDATE_SIZE = 'UPDATE_SIZE';

export const AddSizeAction = size => {
  return {
    type: ADD_SIZE,
    payload: size
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

