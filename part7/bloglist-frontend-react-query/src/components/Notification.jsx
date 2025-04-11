import { useNotificationValue } from "../NotificationContext";

const Notification = () => {
  const notification = useNotificationValue()
  if (notification === null) {
    return null;
  }

  const messageStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return (
    <div className="message error" style={messageStyle}>
      {notification}
    </div>
  );
};

export default Notification;
