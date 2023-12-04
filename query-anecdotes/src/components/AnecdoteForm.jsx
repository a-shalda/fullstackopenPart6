import { createAnecdote } from '../requests'

const AnecdoteForm = () => {

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdote(content)
    event.target.anecdote.value = ''
    console.log(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
