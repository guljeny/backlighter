import { call, put, takeLatest } from 'redux-saga/effects'
import {
  DEVICE_LIST_LOAD_REQUESTED,
  DEVICE_LIST_LOAD_SUCCEEDED,
  DEVICE_LIST_LOAD_FAILED,
} from '$actions/device'
import api from '$api/device'

function* loadDeviceList () {
  try {
    const { success, payload } = yield call(api.getList)
    if (!success) throw new Error('cant load')
    yield put({ type: DEVICE_LIST_LOAD_SUCCEEDED, payload })
  } catch (e) {
    yield put({ type: DEVICE_LIST_LOAD_FAILED })
  }
}

export default function* deviceList () {
  yield takeLatest(DEVICE_LIST_LOAD_REQUESTED, loadDeviceList)
}
