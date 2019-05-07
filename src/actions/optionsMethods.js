import store from '../store/store';
import { AddOptionAction, FetchOptionAction, UpdateOptionAction } from './optionsActions';

export function fetchOptions(){
  return dispatch => {
    return store.getAllOptions()
      .then(payload => {
        dispatch(FetchOptionAction(payload))
        return payload;
      }
    );
  }
}

export function addOptions(payload){
  return dispatch => {
    return store.setOptions(payload)
      .then(() => { dispatch(AddOptionAction(payload)) }
    );
  }
}

export function updateOption(option){
  return dispatch => {
    return store.updateOption(option)
      .then(option => {
        dispatch(UpdateOptionAction(option));
        dispatch(fetchOptions())
      }
    );
  }
}
