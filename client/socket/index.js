import io from 'socket.io-client'
import {
  updateDevise,
  updateAllDevises,
  DEVISE_LIST_UPDATE_ONE,
  DEVISE_LIST_UPDATE_ALL,
} from '$actions/deviseList'
import { CONNECT_USER } from '$actions/user'
import store from '$store'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(CONNECT_USER, user.id)
  })
  socket.on(DEVISE_LIST_UPDATE_ONE, payload => { store.dispatch(updateDevise(payload)) })
  socket.on(DEVISE_LIST_UPDATE_ALL, payload => { store.dispatch(updateAllDevises(payload)) })
}

export default socket
