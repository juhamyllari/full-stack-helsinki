import React from 'react'
import useField from '../hooks/index'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateBlog = (props) => {
  const title = useField('')
  const author = useField('')
  const url = useField('')
  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value }
    const createdBlog = await props.createBlog(newBlog, props.user)
    props.notify(`added new blog: ${createdBlog.title} by ${createdBlog.author}`, false)
    title.reset()
    author.reset()
    url.reset()
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" />
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" id="author" />
          <Form.Label>URL</Form.Label>
          <Form.Control type="text" id="url" />
          <Button type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { createBlog, notify })(CreateBlog)