import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (data) => {
  return axios.post(baseUrl, data)
}

const update = (id, data) => {
  return axios.put(`${baseUrl}/${id}`, data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }
