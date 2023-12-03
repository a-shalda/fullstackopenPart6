import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationAnecdotes, removeNotificationAnecdotes } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.inputAnecdote.value
    dispatch(createAnecdote(content))
    dispatch(notificationAnecdotes(`You added '${content}'`))
    event.target.inputAnecdote.value = ''
    setTimeout(() => {dispatch(removeNotificationAnecdotes(null))}, 5000)
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