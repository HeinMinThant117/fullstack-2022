import { connect, useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {
  return (
    <div>
      all
      <input
        type='radio'
        name='filter'
        onChange={() => props.filterChange('ALL')}
      />
      important
      <input
        type='radio'
        name='filter'
        onChange={() => props.filterChange('IMPORTANT')}
      />
      nonimportant
      <input
        type='radio'
        name='filter'
        onChange={() => props.filterChange('NONIMPORTANT')}
      />
    </div>
  )
}

export default connect(null, { filterChange })(VisibilityFilter)
