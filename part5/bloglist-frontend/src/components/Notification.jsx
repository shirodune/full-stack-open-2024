const Notification = ({message}) => {
  if(message === null) {
    return null
  }

  const messageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div className="message" style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification