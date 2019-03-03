import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const modified = state.map(anec => {
        if (anec.id !== action.data.id) {
          return anec
        } else {
          return { ...anec, votes: anec.votes + 1 }
        }
      })
      return modified.sort((a, b) => b.votes - a.votes)
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.voteFor(id)
    dispatch({
      type: 'VOTE',
      data: {
        id
      }
    })
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(
      {
        type: 'ADD',
        data: newAnecdote
      }
    )
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer