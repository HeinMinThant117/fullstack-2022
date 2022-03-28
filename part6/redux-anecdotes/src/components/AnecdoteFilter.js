import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const handleFilterChange = (event) => {
    event.preventDefault()
    props.setFilter(event.target.value)
  }
  return (
    <div>
      filter
      <input name='filter' type='text' onChange={handleFilterChange} />
    </div>
  )
}

export default connect(null, { setFilter })(AnecdoteFilter)
