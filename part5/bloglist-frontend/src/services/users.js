import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  let users = await axios.get(baseUrl)
  return users.data
}

export default { getAll }
