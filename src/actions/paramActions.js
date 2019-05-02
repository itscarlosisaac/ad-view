export const ADD_PARAM = 'ADD_PARAM';
export const FECTH_PARAM = 'FECTH_PARAM';
export const UPDATE_PARAM = 'UPDATE_PARAM';
export const DELETE_PARAM = 'DELETE_PARAM';

export const AddParamAction = param => {
  return {
    type: ADD_PARAM,
    payload: param
  }
}

export const FetchParamAction = params => {
  return {
    type: FECTH_PARAM,
    payload: params
  }
}

export const updateParamAction = param => {
  return {
    type: UPDATE_PARAM,
    payload: param
  }
}

export const DeleteParamAction = param => {
  return {
    type: DELETE_PARAM,
    payload: param
  }
}
