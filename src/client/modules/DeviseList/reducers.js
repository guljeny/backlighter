import {
  DEVISES_LOAD_REQUESTED,
  DEVISES_LOAD_FAILED,
  DEVISES_LOAD_SUCCEEDED,
  DEVISES_UPDATE,
} from './actions'

const initialState = {
  loading: true,
  list: [],
  lastFirmwareVersion: 0,
}

export default function user (state = initialState, action) {
  switch (action.type) {
    case DEVISES_LOAD_REQUESTED: {
      return {
        ...state,
        loading: true,
      }
    }
    case DEVISES_LOAD_FAILED: {
      return {
        ...state,
        loading: false,
      }
    }
    case DEVISES_UPDATE: {
      const { uid, ...rest } = action.payload
      if (!uid) return state
      const list = [...state.list].map(item => {
        if (item.uid !== uid) return item
        return {
          ...item,
          ...rest,
        }
      })
      return {
        ...state,
        list,
      }
    }
    case DEVISES_LOAD_SUCCEEDED: {
      const { list, lastFirmwareVersion } = action.payload
      return {
        ...state,
        list,
        lastFirmwareVersion,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}
