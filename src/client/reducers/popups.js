import { SHOW_POPUP, CLOSE_POPUP } from '$actions/popups'

const initialState = {
  popupQueue: [],
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP: {
      return {
        popupQueue: [
          action.payload,
          ...state.popupQueue,
        ],
      }
    }
    case CLOSE_POPUP: {
      const popupQueue = [...state.popupQueue]
      popupQueue.shift()
      return { popupQueue }
    }
    default: {
      return state
    }
  }
}
