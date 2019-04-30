import store from '../store/store';
import uuid from 'uuid';
import { FetchSizeAction, UpdateSizeAction, AddSizeAction } from './sizeActions';

export function fetchSizes(){
  return dispatch => {
    return store.getAllSizes()
      .then(data => {
        dispatch(FetchSizeAction(data));
        return data;
    })
  }
}

export function updateSize(size){
  return dispatch => {
    return store.updateSize(size)
      .then(size => {
        dispatch(UpdateSizeAction(size));
        dispatch(fetchSizes())
      }
    );
  }
}

export function addSize(size){
  return dispatch => {
    const payload = transformSize(size);
    return store.setSize(payload)
      .then(() => { dispatch(AddSizeAction(payload)) }
    );
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