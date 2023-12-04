import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = content => {
  axios.post(baseUrl, content).then(res => res.data)}

export const voteAnecdote = async (changedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${changedAnecdote.id}`, changedAnecdote)
  return response.data
}