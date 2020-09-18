import io from 'socket.io-client'
import store from '$store'
import {
  updateDevice,
  updateAllDevices,
  DEVICE_LIST_UPDATE_ONE,
  DEVICE_LIST_UPDATE_ALL,
} from '$actions/device'
import { CONNECT_USER } from '$actions/user'
import clientUid from '$utils/clientUid'

const socket = io()

export function bootstrapSockets () {
  socket.on('connect', () => {
    const { user } = store.getState()
    if (!user.authorized) return
    socket.emit(CONNECT_USER, user.id)
  })
  socket.on(DEVICE_LIST_UPDATE_ONE, ({ clientUid: id, ...rest }) => {
    if (id === clientUid) return
    store.dispatch(updateDevice(rest))
  })
  socket.on(DEVICE_LIST_UPDATE_ALL, payload => { store.dispatch(updateAllDevices(payload)) })
}

export default socket
