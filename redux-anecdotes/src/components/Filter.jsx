import { filterAnecdotes } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterAnecdotes(event.target.value))
  }

  return (
    <div>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter