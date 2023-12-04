import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)


export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = content => {
  const updatedAnecdote = {
    content: content,
    id: getId(),
    votes: 0
  }
  axios.post(baseUrl, updatedAnecdote).then(res => res.data)}