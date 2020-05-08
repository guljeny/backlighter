import { combineReducers } from 'redux'
import user from './user'
import popups from './popups'
import devises from './devises'

export default combineReducers({
  popups,
  user,
  devises,
})
