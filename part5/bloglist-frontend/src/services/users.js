import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  let users = await axios.get(baseUrl)
  return users.data
}

const getOne = async (id) => {
  let user = await axios.get(`${baseUrl}/${id}`)
  return user.data
}

export default { getAll, getOne }
