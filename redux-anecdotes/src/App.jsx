import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from './reducers/anecdoteReducer'
import { addAnecdote } from './reducers/anecdoteReducer'


const App = () => {
  const anecdotesToSort = useSelector(state => state)
  const anecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = id => dispatch(voteForAnecdote(id))

  const createAnecdote = event => {
    event.preventDefault()
    const content = event.target.inputAnecdote.value
    event.target.inputAnecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="inputAnecdote"/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App