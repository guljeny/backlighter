import { SHOW_POPUP, CLOSE_POPUP } from '$actions/popups'

const initialState = {
  popupQueue: [],
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case SHOW_POPUP: {
      return {
        popupQueue: [
          ...state.popupQueue,
          action.payload,
        ],
      }
    }
    case CLOSE_POPUP: {
      const popupQueue = [...state.popupQueue]
      return { popupQueue: popupQueue.filter(({ name }) => name !== action.payload) }
    }
    default: {
      return state
    }
  }
}
