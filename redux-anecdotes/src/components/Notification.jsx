import { useSelector } from 'react-redux'


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