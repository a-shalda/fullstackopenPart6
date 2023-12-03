import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

  const anecdotesToSort = useSelector(state => state)
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