import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const getId = () => (100000 * Math.random()).toFixed(0)


const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newNoteMutation.mutate({ content, id: getId(), votes: 0 })
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
