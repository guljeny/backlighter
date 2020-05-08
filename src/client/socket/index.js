import io from 'socket.io-client'
import { updateDevise, DEVISES_UPDATE_ONE } from '$actions/devises'
import store from '../store'
import { USER_CONNECTION } from './actions'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(USER_CONNECTION, user.id)
  })
  socket.on(DEVISES_UPDATE_ONE, payload => {
    store.dispatch(updateDevise(payload))
  })
}

export default socket
