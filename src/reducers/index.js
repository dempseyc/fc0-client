import { combineReducers } from 'redux'
import contentReducer from './contentReducers'
import viewsReducer from './viewsReducers'
import userReducer from './userReducers'
import cableReducer from './cableReducers'

export default combineReducers({
  cableReducer,
  contentReducer,
  viewsReducer,
  userReducer
})