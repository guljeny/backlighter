import io from 'socket.io-client'
import { updateDevise, availableDevise, DEVISES_UPDATE_ONE, DEVISES_AVAILABLE_NEW } from '$actions/devises'
import store from '../store'
import { USER_CONNECTION } from './actions'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(USER_CONNECTION, user.id)
  })
  socket.on(DEVISES_UPDATE_ONE, payload => { store.dispatch(updateDevise(payload)) })
  socket.on(DEVISES_AVAILABLE_NEW, payload => { store.dispatch(availableDevise(payload)) })
}

export default socket
