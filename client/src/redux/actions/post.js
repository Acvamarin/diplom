import axios from 'axios'

import {
  FORM_LOADING,
  ADD_FORM,
  GET_FORMS,
  GET_FORM,
  DELETE_FORM,
  CLEAR_FORMS,
  UPDATE_FORM,
} from './types'

export const create = (form) => (dispatch) => {
  axios
    .post('/network/posts', form)
    .then((response) => dispatch({
      type: ADD_FORM,
      payload: response.data
    }))
}
export const getAll = (params) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get('/network/posts', { params })
    .then((response) => dispatch({
      type: GET_FORMS,
      payload: {
        posts: response.data,
        totalCount: +response.headers['x-total-count']
      }
    }))
    .catch(() => {
      dispatch(setPostLoading(false))
      dispatch(clearPosts())
    })
}

export const getById = (id) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get(`/network/posts/${id}`)
    .then((response) => dispatch({
      type: GET_FORM,
      payload: response.data
    }))
    .catch(() => dispatch(setPostLoading(false)))
}

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/network/posts/${id}`)
    .then(() => dispatch({
      type: DELETE_FORM,
      payload: id
    }))
}
export const update = (id) => (dispatch) => {
  axios.put(`/network/posts/${id}`).then(() =>
    dispatch({
      type: UPDATE_FORM,
      payload: id,
    })
  );
};
export const createDisLike = (postId, TYPE) => (dispatch) => {
  axios.post(`/network/posts/${postId}/dislikes`).then((response) =>
    dispatch({
      type: TYPE,
      payload: response.data,
    })
  );
};
export const removeDisLike = (postId, dislikeId, TYPE) => (dispatch) => {
  axios.delete(`/network/posts/${postId}/dislikes/${dislikeId}`).then((response) =>
    dispatch({
      type: TYPE,
      payload: response.data,
    })
  );
};

export const createLike = (postId, TYPE) => (dispatch) => {
  axios
    .post(`/network/posts/${postId}/likes`)
    .then((response) => dispatch({
      type: TYPE,
      payload: response.data
    }))
}

export const removeLike = (postId, likeId, TYPE) => (dispatch) => {
  axios
    .delete(`/network/posts/${postId}/likes/${likeId}`)
    .then((response) => dispatch({
      type: TYPE,
      payload: response.data
    }))
}

export const createComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/network/posts/${postId}/comments`, comment)
    .then((response) => dispatch({
      type: UPDATE_FORM,
      payload: response.data
    }))
}

export const removeComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/network/posts/${postId}/comments/${commentId}`)
    .then((response) => dispatch({
      type: UPDATE_FORM,
      payload: response.data
    }))
}

const clearPosts = () => ({
  type: CLEAR_FORMS
})

const setPostLoading = (isLoading) => ({
  type: FORM_LOADING,
  payload: isLoading
})
