import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useCounterDispatch } from "../CounterContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useCounterDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      dispatch({type: 'SET_MESSAGE', payload: `anecdote '${newAnecdote.content}' created`})
      setTimeout(() => dispatch({type: 'SET_MESSAGE', payload: ''}), 5000)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) =>{
      dispatch({type: 'SET_MESSAGE', payload: error.response.data.error})
      console.log(error.response.data.error)
      setTimeout(() => dispatch({type: 'SET_MESSAGE', payload: ''}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
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
