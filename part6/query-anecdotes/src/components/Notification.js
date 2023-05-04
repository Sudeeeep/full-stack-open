import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notification, dispatchNotification] = useContext(AnecdoteContext);

  return <div style={style}>{notification}</div>;
};

export default Notification;
