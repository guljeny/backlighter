import makeAction from '$utils/makeAction'
import { deviseList } from '$common/actions.yml'

export const DEVISE_LIST_LOAD_REQUESTED = 'DEVISE_LIST:LOAD_REQUESTED'
export const DEVISE_LIST_LOAD_SUCCEEDED = 'DEVISE_LIST:LOAD_SUCCEEDED'
export const DEVISE_LIST_LOAD_FAILED = 'DEVISE_LIST:LOAD_FAILED'
export const loadDeviseList = makeAction(DEVISE_LIST_LOAD_REQUESTED)

export const DEVISE_LIST_UPDATE_ONE = deviseList.updateOne
export const updateDevise = makeAction(DEVISE_LIST_UPDATE_ONE)

export const DEVISE_LIST_UPDATE_ALL = deviseList.updateAll
export const updateAllDevises = makeAction(DEVISE_LIST_UPDATE_ALL)
