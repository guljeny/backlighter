import { all } from 'redux-saga/effects'
import deviseList from './modules/DeviseList/sagas'

export default function* rootSaga () {
  yield all([
    deviseList(),
  ])
}
