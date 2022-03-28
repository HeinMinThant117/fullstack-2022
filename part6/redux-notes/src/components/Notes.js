import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Notes = (props) => {
  const notesToShow = () => {
    if (props.filter === 'ALL') {
      return props.notes
    }

    return props.filter === 'IMPORTANT'
      ? props.notes.filter((note) => note.important)
      : props.notes.filter((note) => !note.important)
  }

  return (
    <ul>
      {notesToShow.map((note) => (
        <li key={note.id} onClick={() => props.toggleImportance(note.id)}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      ))}
    </ul>
  )
  return (
	  <ul>
		  {props.notes.map(note => )}
	  </ul>
  )
}

const mapDispatchToProps = {
  toggleImportanceOf,
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    }
  }

  return {
    notes:
      state.filter === 'IMPORTANT'
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)
