import {
  EDIT_STREAM,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM
} from '../actions/types'

const streamReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      // const newState = { ...state }
      // newState[action.payload.id] = action.payload
      // return newState
      return { ...state, [action.payload.id]: action.payload } // short syntax
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload }
    case FETCH_STREAMS:
      const mergedState = { ...state }
      action.payload.forEach(stream => {
        mergedState[stream.id] = stream
      })
      return mergedState
    case DELETE_STREAM:
      const newState = { ...state }
      delete newState[action.payload]
      return newState
    default:
      return state
  }
}

export default streamReducer
