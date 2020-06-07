import axios from 'axios'

import {
  SUBSCRIPTION_LOADING,
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION
} from './consts'

export const create = (like) => (dispatch) => {
  axios
    .post('/network/subscriptions', like)
    .then((response) => dispatch({
      type: ADD_SUBSCRIPTION,
      payload: response.data
    }))
}

export const getAll = (params = {}) => (dispatch) => {
  dispatch(setSubscriptionLoading(true))
  axios
    .get('/network/subscriptions', { params })
    .then((response) => dispatch({
      type: GET_SUBSCRIPTIONS,
      payload: response.data
    }))
    .catch(() => dispatch(setSubscriptionLoading(false)))
}

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/network/subscriptions/${id}`)
    .then(() => dispatch({
      type: DELETE_SUBSCRIPTION,
      payload: id
    }))
}

export const setSubscriptionLoading = (isLoading) => ({
  type: SUBSCRIPTION_LOADING,
  payload: isLoading
})
