import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({ type: 'anecdotes/createAnecdote', payload: newAnecdote})
    dispatch({ type: 'notification/notificationChange', payload: `you created '${newAnecdote.content}'`})
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