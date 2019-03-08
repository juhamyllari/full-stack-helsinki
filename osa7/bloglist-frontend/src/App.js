/* eslint-disable react/no-unknown-property */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { loginUser } from './reducers/userReducer'
import { setUser } from './reducers/userReducer'
import LoggedUser from './components/LoggedUser'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const padding = { padding: 5 }

  if (props.user === null) {
    return (
      <div className="container" >
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div className="container" >
        <Notification />
        <Router>
          <div>
            <div>
              <Link style={padding} to="/">blogs</Link>
              <Link style={padding} to="/users">users</Link>
              <LoggedUser />
            </div>
            <Route exact path="/" render={() =>
              <div>
                <BlogList />
                <Togglable buttonLabel="new blog">
                  <CreateBlog />
                </Togglable>
              </div>
            } />
            <Route exact path="/users" render={() => <UserList />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User user={props.users.find(u => u.id === match.params.id)} />} />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={props.blogs.find(b => b.id === match.params.id)} />} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUsers,
  loginUser,
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)