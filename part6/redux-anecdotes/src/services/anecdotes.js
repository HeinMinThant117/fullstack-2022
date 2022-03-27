import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (content) => {
  let newContent = {
    content,
    votes: 0,
  }

  const response = await axios.post(baseUrl, newContent)
  return response.data
}

const update = async (id) => {
  let anecdoteToUpdate = await axios.get(`${baseUrl}/${id}`)
  anecdoteToUpdate = anecdoteToUpdate.data

  let updatedAnecdote = {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  }

  let response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, addAnecdote, update }
