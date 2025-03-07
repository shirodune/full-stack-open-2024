import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({ type: 'anecdotes/createAnecdote', payload: anecdote})
    dispatch({ type: 'notification/notificationChange', payload: `you created '${anecdote.content}'`})
    setTimeout(
      () => dispatch({ type: 'notification/notificationChange', payload: ''}),
      5000,
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm