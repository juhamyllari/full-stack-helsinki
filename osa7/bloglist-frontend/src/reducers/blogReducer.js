import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.data)
  case 'INIT':
    return action.data
  case 'DELETE':
    return state.filter(b => b.id !== action.id)
  case 'LIKE':
    return state.map(b => b.id !== action.data.id ? b : action.data)
  default:
    return state
  }
}

const addBlogToUser = (blog, username) => {
  console.log(`This is addBlogToUser, got userId ${JSON.stringify(username)}`)
  return {
    type: 'ADD_BLOG_TO_USER',
    blog,
    username
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    const newBlogWithUserInfo = { ...newBlog, user }
    dispatch({
      type: 'CREATE',
      data: newBlogWithUserInfo
    })
    const blogToAddToUser = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      id: newBlog.id
    }
    dispatch(addBlogToUser(blogToAddToUser, user.username))
    return newBlogWithUserInfo
  }
}

const removeBlogFromUser = (blogId, username) => {
  console.log(`This is removeBlogFromUser, got username ${JSON.stringify(username)}`)
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    blogId,
    username
  }
}

export const deleteBlog = (blogId, username) => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch({
      type: 'DELETE',
      id: blogId
    })
    dispatch(removeBlogFromUser(blogId, username))
  }
}

export const likeBlog = (blog, user) => {
  return async dispatch => {
    const liked = { ...blog, likes: blog.likes + 1 }
    const updated = await blogService.update(liked)
    dispatch({
      type: 'LIKE',
      data: { ...updated, user }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default blogReducer