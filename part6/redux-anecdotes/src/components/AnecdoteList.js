import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filterRegex = useSelector(({ filter }) => new RegExp(filter, 'i'))
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes
      .slice()
      .filter((a) => filterRegex.test(a.content))
      .sort((a, b) => b.votes - a.votes)
  )

  //   const anecdotes = useSelector((state) => state.anecdotes)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`You votes ${anecdote.content} `))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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
