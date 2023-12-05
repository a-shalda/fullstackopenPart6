import { useSelector } from 'react-redux'

let timeoutId

export const cleartimeOutId = () => {
  timeoutId && clearTimeout(timeoutId)
}

export const settimeOutId = (newTimeoutId) => {
  timeoutId = newTimeoutId
}


const Notification = () => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let content
  notification &&
  (
    content =
    <div style={style}>
      {notification}
    </div>
  )

  return content
}

export default Notification