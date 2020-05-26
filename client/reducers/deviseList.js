import {
  DEVISE_LIST_LOAD_REQUESTED,
  DEVISE_LIST_LOAD_SUCCEEDED,
  DEVISE_LIST_LOAD_FAILED,
  DEVISE_LIST_UPDATE_ONE,
  DEVISE_LIST_UPDATE_ALL,
} from '$actions/deviseList'

const initialState = {
  loading: true,
  items: [],
  lastFirmwareVersion: 0,
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case DEVISE_LIST_LOAD_REQUESTED: {
      return {
        ...state,
        loading: true,
      }
    }
    case DEVISE_LIST_LOAD_SUCCEEDED: {
      const { items, lastFirmwareVersion } = action.payload
      return {
        ...state,
        items,
        lastFirmwareVersion,
        loading: false,
      }
    }
    case DEVISE_LIST_LOAD_FAILED: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEVISE_LIST_UPDATE_ONE: {
      const { uid, ...rest } = action.payload
      if (!uid) return state
      let items = [...state.items]
      if (items.some(item => item.uid === uid)) {
        items = items.map(item => {
          if (item.uid !== uid) return item
          return {
            ...item,
            ...rest,
          }
        })
      } else {
        items.push({ uid, ...rest })
      }
      return { ...state, items }
    }
    case DEVISE_LIST_UPDATE_ALL: {
      return {
        ...state,
        items: state.items.map(({ uid, ...rest }) => {
          const update = action.payload.find(el => el.uid === uid)
          if (update) {
            return {
              ...rest,
              ...update,
            }
          }
          return { uid, ...rest }
        }),
      }
    }
    default: {
      return state
    }
  }
}
