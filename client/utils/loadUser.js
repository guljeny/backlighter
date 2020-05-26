import store from '$store'
import user from '$api/user'
import { updateUser, USER_CONNECTION } from '$actions/user'
import socket from '$socket'

export default async function () {
  const { success, payload } = await user.get()
  if (success && payload) {
    store.dispatch(updateUser(payload))
    socket.emit(USER_CONNECTION, payload.id)
  }
}
