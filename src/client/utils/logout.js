import store from '$store'
import request from '$utils/request'
import { clearUser } from '$actions/user'

export default async function () {
  const { success } = await request.get('api/user/logout')
  if (success) store.dispatch(clearUser())
}
