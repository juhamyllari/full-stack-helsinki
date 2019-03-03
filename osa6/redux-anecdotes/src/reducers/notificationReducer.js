const initialNotification = ''

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.message
    default:
      return state
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFY',
    message
  }
}

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(notify(message))
    setTimeout(() => {
      dispatch(notify(''))
    }, duration * 1000)
  }
}

export default notificationReducer