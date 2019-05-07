import { combineReducers } from 'redux'
import SizeReducer from './sizeReducer';
import ParamReducer from './paramReducer';
import OptionReducer from './optionsReducer'

export default combineReducers({
  SizeReducer,
  ParamReducer,
  OptionReducer
})
