import { all } from 'redux-saga/effects'
import deviseList from './deviseList'

export default function* rootSaga () {
  yield all([
    deviseList(),
  ])
}
