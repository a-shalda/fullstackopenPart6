import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { notificationAnecdotes, removeNotificationAnecdotes } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { cleartimeOutId, settimeOutId } from './Notification'


const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotesToFilter = useSelector(state => state.anecdotes)
  const filterInput = useSelector(state => state.filter)
  let anecdotesToSort

  anecdotesToSort = anecdotesToFilter.filter(anecdote => anecdote.content.toLowerCase().includes(filterInput))

  const anecdotes = anecdotesToSort.sort((a, b) => b.votes - a.votes)

  const handleClick = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote))

    dispatch(notificationAnecdotes(`You voted '${anecdote.content}'`, 5000))
    cleartimeOutId()
    const newTimeoutId = setTimeout(() => {dispatch(removeNotificationAnecdotes(null))}, 5000)
    settimeOutId(newTimeoutId)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList