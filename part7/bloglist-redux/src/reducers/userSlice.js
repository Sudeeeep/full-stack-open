import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      return action.payload;
    },
  },
});

export const login = (
  username,
  password,
  setUsername,
  setPassword,
  setError,
  resetNotification
) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      console.log("in login");

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      setError(false);
    } catch (err) {
      setError(true);
      dispatch(setNotification(err.response.data.error));
      resetNotification();
      setUsername("");
      setPassword("");
    }
  };
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
