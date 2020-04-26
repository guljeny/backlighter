import store from '$store'
import request from '$utils/request'
import { updateUser } from '$actions/user'

export default async function () {
  const { success, payload } = await request.get('api/user')
  if (success && payload) store.dispatch(updateUser(payload))
}
