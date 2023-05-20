const userReducer = (state, action) => {
  switch (action.type) {
    case "set_user": {
      return action.payload;
    }
    case "reset":
      return null;
    default:
      return null;
  }
};

export default userReducer;
