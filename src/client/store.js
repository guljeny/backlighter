import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  reducers,
  compose(
    applyMiddleware(sagaMiddleware),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

sagaMiddleware.run(rootSaga)
