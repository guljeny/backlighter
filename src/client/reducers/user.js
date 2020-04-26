import { UPDATE_USER, CLEAR_USER } from '$actions/user'

const initialState = {
  authorized: false,
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        ...action.payload,
      }
    }
    case CLEAR_USER: {
      return initialState
    }
    default: {
      return state
    }
  }
}
