import { all } from 'redux-saga/effects'
import devises from './devises'

export default function* rootSaga () {
  yield all([
    devises(),
  ])
}
