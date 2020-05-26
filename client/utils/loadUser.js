import store from '$store'
import request from '$utils/request'
import { updateUser, USER_CONNECTION } from '$actions/user'
import socket from '$socket'

export default async function () {
  const { success, payload } = await request.get('/api/user/get')
  if (success && payload) {
    store.dispatch(updateUser(payload))
    socket.emit(USER_CONNECTION, payload.id)
  }
}
