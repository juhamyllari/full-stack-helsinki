import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.users
  case 'ADD_BLOG_TO_USER':
    return state.map(u => u.username !== action.username ? u : { ...u, blogs: u.blogs.concat(action.blog) })
  case 'REMOVE_BLOG_FROM_USER':
    return state.map(u => u.username !== action.username ? u : { ...u, blogs: u.blogs.filter(b => b.id !== action.blogId) })
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}

export default usersReducer