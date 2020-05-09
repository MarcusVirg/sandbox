import _ from 'lodash'
import api from '../api'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value()
}

export const fetchPosts = () => async dispatch => {
  const res = await api.get('/posts')

  dispatch({ type: 'FETCH_POSTS', payload: res.data })
}

export const fetchUser = id => async dispatch => {
  const res = await api.get(`/users/${id}`)

  dispatch({ type: 'FETCH_USER', payload: res.data })
}

// Underscore means private function
// Memoizes the api call to limit the number of network requests
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const res = await api.get(`/users/${id}`)

//   dispatch({
//     type: 'FETCH_USER',
//     payload: res.data
//   })
// })
