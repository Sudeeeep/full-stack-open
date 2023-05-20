const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  } else if (isError) {
    console.log(message);
    return <div className="error">{message}</div>;
  }
  return <div className="success">{message}</div>;
};

export default Notification;
