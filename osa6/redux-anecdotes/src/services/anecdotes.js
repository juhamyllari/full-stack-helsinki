import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteFor = async (id) => {
  const getResponse = await axios.get(`${baseUrl}/${id}`)
  const anecdote = getResponse.data
  const modifiedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
  const putResponse = await axios.put(`${baseUrl}/${id}`, modifiedAnecdote)
  return putResponse.data
}

export default { getAll, createNew, voteFor }