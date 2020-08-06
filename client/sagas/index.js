import { all } from 'redux-saga/effects'
import deviceList from './device'

export default function* rootSaga () {
  yield all([
    deviceList(),
  ])
}
