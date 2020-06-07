import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { SET_CURRENT_USER } from './consts'
import setAuthToken from '../utils/setAuthToken'

export const register = (user, history) => () => {
  axios
    .post('/network/auth/registration', user)
    .then(() => history.push('/login'))
}

export const login = (user) => (dispatch) => {
  axios
    .post('/network/auth/login', user)
    .then((response) => {
      const { tok } = response.data
      localStorage.setItem('access_token', tok)
      setAuthToken(tok)
      const dec = jwtDecode(tok)
      dispatch(setCurrentUser(dec))
    })
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('access_token')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
})
