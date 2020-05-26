import store from '$store'
import { showPopup } from '$actions/popups'

export default function (name, Component, props = {}) {
  store.dispatch(showPopup({ name, Component, props }))
}
