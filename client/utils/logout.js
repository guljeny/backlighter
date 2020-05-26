import store from '$store'
import { clearUser } from '$actions/user'
import api from '$api/user'

export default async function () {
  const { success } = await api.logout()
  if (success) store.dispatch(clearUser())
}
