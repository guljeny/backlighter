import { createStore, combineReducers } from 'redux'
import user from './reducers/user'
import popups from './reducers/popups'

export default createStore(
  combineReducers({
    popups,
    user,
  }),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
