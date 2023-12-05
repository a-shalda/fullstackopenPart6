import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'


const notificationReducer = (state, action) => {
  return action
}

export let timeoutId

export const cleartimeOutId = () => {
  timeoutId && clearTimeout(timeoutId)
}

export const settimeOutId = (newTimeoutId) => {
  timeoutId = newTimeoutId
}


const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      console.log('error')
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 2
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
    voteMutation.mutate(changedAnecdote)
    notificationDispatch(`Anecdote '${anecdote.content}' voted`)
    cleartimeOutId()
    const newTimeoutId = setTimeout(() => { notificationDispatch(null) }, 3000)
    settimeOutId(newTimeoutId)
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
