import React from 'react'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const LoggedUser = (props) => {

  const handleLogout = () => {
    props.setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  return(
    <>Logged in as {props.user.name}
      <Button size="sm" onClick={handleLogout}>log out</Button>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(LoggedUser)