import makeAction from '$utils/makeAction'

export const DEVISES_LOAD_REQUESTED = 'DEVISES:LOAD:REQUESTED'
export const DEVISES_LOAD_SUCCEEDED = 'DEVISES:LOAD:SUCCEEDED'
export const DEVISES_LOAD_FAILED = 'DEVISES:LOAD:FAILED'
export const loadDevises = makeAction(DEVISES_LOAD_REQUESTED)

export const DEVISES_UPDATE = 'DEVISES:UPDATE'
export const updateDevise = makeAction(DEVISES_UPDATE)
