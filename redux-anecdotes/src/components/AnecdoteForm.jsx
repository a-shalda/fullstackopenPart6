import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.inputAnecdote.value
    dispatch(createAnecdote(content))
    event.target.inputAnecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="inputAnecdote"/>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm