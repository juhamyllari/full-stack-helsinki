import React from 'react'

const DetailedAnecdote = ({ anecdote }) => (
  <div>
    <h2>"{anecdote.content}" by {anecdote.author}</h2>
    has {anecdote.votes} votes. <br />
    <p>
      For more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
)

export default DetailedAnecdote