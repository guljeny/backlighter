import { combineReducers } from 'redux'
import user from './user'
import popups from './popups'
import deviseList from './deviseList'

export default combineReducers({
  popups,
  user,
  deviseList,
})
