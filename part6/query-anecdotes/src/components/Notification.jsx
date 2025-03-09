import { useCounterValve } from "../CounterContext"

const Notification = () => {
  const counter = useCounterValve()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (counter === '') return null

  return (
    <div style={style}>
      {counter}
    </div>
  )
}

export default Notification
