import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'


const notificationReducer = (state, action) => {
  return action
}

let timeoutId


const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  //isPending, isLoading, isError, data, error

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const handleVote = (anecdote) => {

    const changedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const result = voteMutation.mutate(changedAnecdote)

    notificationDispatch(`Anecdote '${anecdote.content}' voted`)
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => { notificationDispatch(null) }, 5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <Notification />
      </NotificationContext.Provider>

      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <AnecdoteForm />
      </NotificationContext.Provider>


      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
