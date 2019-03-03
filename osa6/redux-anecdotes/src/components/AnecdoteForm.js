import React from 'react';
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    await props.createNew(content)
    props.setNotification(`Created new anecdote '${content}'`, 5)
  }
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default connect(null, { createNew, setNotification })(AnecdoteForm)