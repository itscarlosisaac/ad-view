import store from '../store/store';
import { FetchSizeAction, UpdateSizeAction } from './sizeActions';

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