import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const Login = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const user = await props.loginUser( { username, password } )
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
    } catch (error) {
      props.notify('Wrong username or password', 10)
    }
  }
  return (
    <div>
      <h2>Log into application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control id="username" type="text" name="username" />
          <Form.Label>password</Form.Label>
          <Form.Control id="password" type="text" name="password" />
          <Button id="login" type="submit">kirjaudu</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(null, { loginUser, notify })(Login)