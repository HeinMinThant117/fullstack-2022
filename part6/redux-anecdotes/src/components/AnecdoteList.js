import { connect } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes

  const vote = async (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    props.updateAnecdote(id)
    props.setNotification(`you voted ${anecdote.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  let filterRegex = new RegExp(state.filter, 'i')
  return {
    anecdotes: state.anecdotes
      .slice()
      .filter((a) => filterRegex.test(a.content))
      .sort((a, b) => b.votes - a.votes),
    filter: state.filter,
  }
}

export default connect(mapStateToProps, { updateAnecdote, setNotification })(
  AnecdoteList
)
