import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotesToFilter = useSelector(state => state.anecdotes)
  const filterInput = useSelector(state => state.filter)
  let anecdotesToSort

  anecdotesToSort = anecdotesToFilter.filter(anecdote => anecdote.content.toLowerCase().includes(filterInput))

  const anecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteForAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList