import { combineReducers } from 'redux'
import contentReducer from './contentReducers'
import viewsReducer from './viewsReducers'
import userReducer from './userReducers'

export default combineReducers({
  contentReducer,
  viewsReducer,
  userReducer
})