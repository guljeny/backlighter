import makeAction from '$utils/makeAction'
import { user } from '$common/actions.yml'

export const CONNECT_USER = user.connect

export const UPDATE_USER = 'USER:UPDATE_USER'
export const updateUser = makeAction(UPDATE_USER)

export const CLEAR_USER = 'USER:CLEAR_USER'
export const clearUser = makeAction(CLEAR_USER)
