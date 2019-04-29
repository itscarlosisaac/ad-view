const ParamReducer = ( state = [], action ) => {
  return state;
  
  switch(action.type) {
    case 'ADD_PARAM':
      return [
        ...state,
        {
          id: action.id,
        }
      ]
    // Default
    default:
      return state
  }
}

export default ParamReducer;