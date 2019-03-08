import React from 'react'
import Button from 'react-bootstrap/Button'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'
import { likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
  const handleLike = (event) => {
    event.preventDefault()
    props.likeBlog(props.blog, props.user)
    props.notify(`Liked blog ${props.blog.title}`, 5)
  }
  const handleRemove = (event) => {
    event.preventDefault()
    props.deleteBlog(props.blog.id, props.user.username)
    props.notify(`Deleted blog ${props.blog.title}`, 5)
  }

  if (props.blog === undefined) {
    return null
  }
  return (
    <div>
      <h2>{props.blog.title}</h2>
      <h3>{props.blog.author}</h3>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        <p>likes: {props.blog.likes}
          <Button onClick={handleLike}>like</Button>
        </p>
      </div>
      <div>
        <p>added by: {props.blog.user.name}
          {props.user.name === props.blog.user.name &&
             <Button onClick={handleRemove}>delete</Button>}
        </p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { notify, deleteBlog, likeBlog })(Blog)