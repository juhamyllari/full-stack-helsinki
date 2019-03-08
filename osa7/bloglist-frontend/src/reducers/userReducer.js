import { login } from '../services/login'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    data
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const data = await login(credentials)
    dispatch(setUser(data))
    return data
  }
}

export default userReducer