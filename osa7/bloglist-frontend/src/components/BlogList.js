import React from 'react'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(BlogList)