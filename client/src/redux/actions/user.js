import axios from 'axios'

import { GET_USER, USER_LOADING } from './consts'

export const getUserById = (id) => (dispatch) => {
  dispatch(setUserLoading(true))
  axios
    .get(`/network/users/${id}`)
    .then((response) => dispatch({
      type: GET_USER,
      payload: response.data
    }))
    .catch(() => dispatch(setUserLoading(false)))
}
export const getUserByName = (name) => (dispatch) => {
  dispatch(setUserLoading(true))
  axios
    .get(`/network/users/${name}`)
    .then((response) => dispatch({
      type: GET_USER,
      payload: response.data
    }))
    .catch(() => dispatch(setUserLoading(false)))
}

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading
})
