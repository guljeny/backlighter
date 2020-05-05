import { combineReducers } from 'redux'
import user from './user'
import popups from './popups'
import devises from '$modules/DeviseList/reducers'

export default combineReducers({
  popups,
  user,
  devises,
})
