import React from 'react'
import { createFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.createFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style} >
      Filter
      <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { createFilter })(Filter)