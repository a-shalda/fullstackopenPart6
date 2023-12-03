import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

  const anecdotesToFilter = useSelector(state => state.anecdotes)
  const filterInput = useSelector(state => state.filter)
  let anecdotesToSort

  (filterInput !== null) ? anecdotesToSort = anecdotesToFilter.filter(anecdote => anecdote.content.toLowerCase().includes(filterInput))
    : anecdotesToSort = anecdotesToFilter

  const anecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = id => dispatch(voteForAnecdote(id))

  return (
    <>
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
    </>
  )
}

export default AnecdoteList