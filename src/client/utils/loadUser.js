import store from '$store'
import request from '$utils/request'
import { updateUser } from '$actions/user'
import socket from '$socket'
import { USER_CONNECTION } from '$socket/actions'

export default async function () {
  const { success, payload } = await request.get('/api/user')
  if (success && payload) {
    store.dispatch(updateUser(payload))
    socket.emit(USER_CONNECTION, payload.id)
  }
}
