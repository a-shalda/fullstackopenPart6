import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { cleartimeOutId, settimeOutId } from '../App'

const getId = () => (100000 * Math.random()).toFixed(0)



const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      notificationDispatch(error.response.data.error)
      cleartimeOutId()
      const newTimeoutId = setTimeout(() => { notificationDispatch(null) }, 5000)
      settimeOutId(newTimeoutId)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newNoteMutation.mutate({ content, id: getId(), votes: 0 }, {
      onSuccess: () => {
        notificationDispatch(`Anecdote '${content}' added`)
        cleartimeOutId()
        const newTimeoutId = setTimeout(() => { notificationDispatch(null) }, 5000)
        settimeOutId(newTimeoutId)
      }
    })

    event.target.anecdote.value = ''
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
