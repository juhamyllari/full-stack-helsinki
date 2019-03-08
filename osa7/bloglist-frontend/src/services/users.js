import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const allUsers = await axios.get(baseUrl)
  return allUsers.data
}

export default { getAll }