import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>has added the following blogs:</p>
      <ul>
        {props.user.blogs.map(b =>
          <li key={b.id} >{b.title}</li>
        )}
      </ul>
    </div>
  )
}

// const mapStateToProps = (state) => {
// }

export default connect(null, {})(User)