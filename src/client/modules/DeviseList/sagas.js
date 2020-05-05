import { call, put, takeLatest } from 'redux-saga/effects'
import { DEVISES_LOAD_REQUESTED, DEVISES_LOAD_FAILED, DEVISES_LOAD_SUCCEEDED } from './actions'
import api from './api'

function* loadDevises () {
  try {
    const { success, payload } = yield call(api.getList)
    if (!success) throw new Error('cant load')
    yield put({ type: DEVISES_LOAD_SUCCEEDED, payload })
  } catch (e) {
    yield put({ type: DEVISES_LOAD_FAILED })
  }
}

export default function* devises () {
  yield takeLatest(DEVISES_LOAD_REQUESTED, loadDevises)
}
