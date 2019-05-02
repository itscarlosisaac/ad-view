import store from '../store/store';
import uuid from 'uuid';
import { FetchParamAction, updateParamAction, AddParamAction, DeleteParamAction } from './paramActions';

export function fetchParams(){
  return dispatch => {
    return store.getAllParams()
      .then( data => {
        dispatch(FetchParamAction(data))
        return data
      }
    );
  }
}

export function addParam(param) {
  return dispatch => {
    const payload = transformParam(param);
    return store.setParam(payload)
      .then(() => { dispatch(AddParamAction(payload)) }
    );
  }
}

export function updateParam(param){
  return dispatch => {
    return store.updateParam(param)
      .then(param => {
        dispatch(updateParamAction(param));
        dispatch(fetchParams())
      }
    );
  }
}

export function deleteParam(param){
  return dispatch => {
    store.deleteParam(param.id)
      .then(() => {
        dispatch(DeleteParamAction(param))
        dispatch(fetchParams())
      });
  }
}

const transformParam = (payload) => {
  return {
      id: uuid(),
      name: payload.name,
      value: payload.value,
      checked: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
}