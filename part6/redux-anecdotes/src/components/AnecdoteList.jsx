import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    state => state.anecdotes
      .filter(a => a.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch({ type: 'anecdotes/increaseVotes', payload: anecdote.id})
    dispatch({ type: 'notification/notificationChange', payload: `you voted '${anecdote.content}'`})
    setTimeout(
      () => dispatch({ type: 'notification/notificationChange', payload: ''}),
      5000,
    )
  }
  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList 