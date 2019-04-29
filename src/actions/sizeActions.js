import store from '../store/store';

export function fetchSizes(){
  return dispatch => {
    return store.getAllSizes()
      .then(data => {
        dispatch(FetchSizeAction(data));
        return data;
    })
  }
}

export const ADD_SIZE = 'ADD_SIZE';
export const FETCH_SIZE = 'FETCH_SIZE';

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

