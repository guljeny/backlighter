import io from 'socket.io-client'
import {
  updateDevice,
  updateAllDevices,
  DEVICE_LIST_UPDATE_ONE,
  DEVICE_LIST_UPDATE_ALL,
} from '$actions/device'
import { CONNECT_USER } from '$actions/user'
import store from '$store'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(CONNECT_USER, user.id)
  })
  socket.on(DEVICE_LIST_UPDATE_ONE, payload => { store.dispatch(updateDevice(payload)) })
  socket.on(DEVICE_LIST_UPDATE_ALL, payload => { store.dispatch(updateAllDevices(payload)) })
}

export default socket
