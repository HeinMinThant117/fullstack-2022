import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleFilterChange = (event) => {
    event.preventDefault()
    dispatch(setFilter(event.target.value))
  }
  return (
    <div>
      filter
      <input name='filter' type='text' onChange={handleFilterChange} />
    </div>
  )
}

export default AnecdoteFilter
