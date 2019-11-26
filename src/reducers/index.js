import { combineReducers } from 'redux'
import contentReducer from './contentReducers'
import viewsReducer from './viewsReducers'
import userReducer from './userReducers'
import messageReducer from './messageReducers'

export default combineReducers({
  messageReducer,
  contentReducer,
  viewsReducer,
  userReducer
})