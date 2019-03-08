import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.message) {
    return (
      <Alert variant="success" >{props.message}</Alert>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(mapStateToProps)(Notification)