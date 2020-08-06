import { combineReducers } from 'redux'
import user from './user'
import popups from './popups'
import device from './device'

export default combineReducers({
  popups,
  user,
  device,
})
