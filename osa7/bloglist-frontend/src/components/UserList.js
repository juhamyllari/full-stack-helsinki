import React from 'react'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const UserList = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Number of blogs</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { initializeUsers })(UserList)