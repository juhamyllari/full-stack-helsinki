/*eslint-disable no-unused-vars*/
const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return action.message
  default:
    return state
  }
}
/*eslint-enable no-unused-vars*/

export const setNotification = (message) => {
  return {
    type: 'NOTIFY',
    message
  }
}

export const notify = (message, duration) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, duration * 1000)
  }
}

export default notificationReducer