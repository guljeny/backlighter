import { call, put, takeLatest } from 'redux-saga/effects'
import {
  DEVISE_LIST_LOAD_REQUESTED,
  DEVISE_LIST_LOAD_SUCCEEDED,
  DEVISE_LIST_LOAD_FAILED,
} from '$actions/deviseList'
import api from '$api/devise'

function* loadDeviseList () {
  try {
    const { success, payload } = yield call(api.getList)
    if (!success) throw new Error('cant load')
    yield put({ type: DEVISE_LIST_LOAD_SUCCEEDED, payload })
  } catch (e) {
    yield put({ type: DEVISE_LIST_LOAD_FAILED })
  }
}

export default function* deviseList () {
  yield takeLatest(DEVISE_LIST_LOAD_REQUESTED, loadDeviseList)
}
