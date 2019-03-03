import React from 'react';
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

  const handleVote = (anecdote) => {
    props.vote(anecdote.id)
    props.setNotification(`You voted for '${anecdote.content}'`, 5)
  }

  return (
    <>
      {props.visibleAnecdotes
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(a => a.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList