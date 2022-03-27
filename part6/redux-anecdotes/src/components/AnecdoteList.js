import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterRegex = useSelector(({ filter }) => new RegExp(filter, 'i'))
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes
      .slice()
      .filter((a) => filterRegex.test(a.content))
      .sort((a, b) => b.votes - a.votes)
  )

  const vote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(updateAnecdote(id))
    dispatch(setNotification(`you votes ${anecdote.content}`, 5))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
