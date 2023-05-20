const notificationReducer = (state, action) => {
  switch (action.type) {
    case "set_notification": {
      return action.payload;
    }
    case "reset":
      return null;
    default:
      return null;
  }
};

export default notificationReducer;
