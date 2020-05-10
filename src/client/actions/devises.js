import makeAction from '$utils/makeAction'

export const DEVISES_LOAD_REQUESTED = 'DEVISES:LOAD:REQUESTED'
export const DEVISES_LOAD_SUCCEEDED = 'DEVISES:LOAD:SUCCEEDED'
export const DEVISES_LOAD_FAILED = 'DEVISES:LOAD:FAILED'
export const loadDevises = makeAction(DEVISES_LOAD_REQUESTED)

export const DEVISES_UPDATE_ONE = 'DEVISES:UPDATE_ONE'
export const updateDevise = makeAction(DEVISES_UPDATE_ONE)
export const DEVISES_AVAILABLE_NEW = 'DEVISES:AVAILABLE_DEVISE'
export const availableDevise = makeAction(DEVISES_AVAILABLE_NEW)
