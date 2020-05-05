import io from 'socket.io-client'
import { USER_CONNECTION } from './actions'
import store from '../store'
import { updateDevise, DEVISES_UPDATE } from '$modules/DeviseList/actions'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(USER_CONNECTION, user.id)
  })
  socket.on(DEVISES_UPDATE, payload => {
    store.dispatch(updateDevise(payload))
  })
}

export default socket
