import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ),
)

sagaMiddleware.run(rootSaga)
