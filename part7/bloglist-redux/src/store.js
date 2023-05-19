import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationSlice";
import BlogsReducer from "./reducers/BlogsSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: BlogsReducer,
    users: userReducer,
  },
});

export default store;
