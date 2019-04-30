export const ADD_OPTION = 'ADD_OPTION';
export const FETCH_OPTION = 'FETCH_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';


export const AddOptionAction = option => {
  return {
    type: ADD_OPTION,
    payload: option
  }
}

export const FetchOptionAction = options => {
  return {
    type: FETCH_OPTION,
    payload: options
  }
}

export const UpdateOptionAction = option => {
  return {
    type: UPDATE_OPTION,
    payload: option
  }
}
