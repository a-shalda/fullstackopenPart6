import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = event => {
    event.preventDefault()
    const content = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input name="inputAnecdote"/>
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm