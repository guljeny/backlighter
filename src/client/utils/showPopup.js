import store from '$store'
import { showPopup } from '$actions/popups'

export default function (Component, options = {}) {
  store.dispatch(showPopup({ Component, options }))
}
