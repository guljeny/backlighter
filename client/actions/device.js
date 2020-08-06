import makeAction from '$utils/makeAction'
import { deviceList } from '$common/actions.yml'

export const DEVICE_LIST_LOAD_REQUESTED = 'DEVICE_LIST:LOAD_REQUESTED'
export const DEVICE_LIST_LOAD_SUCCEEDED = 'DEVICE_LIST:LOAD_SUCCEEDED'
export const DEVICE_LIST_LOAD_FAILED = 'DEVICE_LIST:LOAD_FAILED'
export const loadDeviceList = makeAction(DEVICE_LIST_LOAD_REQUESTED)

export const DEVICE_LIST_UPDATE_ONE = deviceList.updateOne
export const updateDevice = makeAction(DEVICE_LIST_UPDATE_ONE)

export const DEVICE_LIST_UPDATE_ALL = deviceList.updateAll
export const updateAllDevices = makeAction(DEVICE_LIST_UPDATE_ALL)
