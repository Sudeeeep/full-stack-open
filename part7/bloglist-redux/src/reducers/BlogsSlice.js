import { createSlice } from "@reduxjs/toolkit";
import BlogService from "../services/blogs";
import { setNotification } from "./notificationSlice";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    getBlogs: (state, action) => {
      return action.payload.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    },
    appendBlog: (state, action) => {
      return state.concat(action.payload);
    },
    likeBlog: (state, action) => {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
    deleteBlog: (state, action) => {
      // console.log(JSON.parse(JSON.stringify(state)));
      return state.filter((s) => s.id !== action.payload.id);
    },
  },
});

export const getAllBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await BlogService.getAll();
      dispatch(getBlogs(response));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createBlogThunk = (blog, setError, resetNotification) => {
  return async (dispatch) => {
    try {
      const createdBlog = await BlogService.create(blog);
      dispatch(appendBlog(createdBlog));
      dispatch(getAllBlogs());
    } catch (err) {
      setError(true);
      dispatch(setNotification(err.response.data.error));
      resetNotification();
    }
  };
};

export const likeBlogThunk = (id, likedBlog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await BlogService.update(id, likedBlog);
      console.log(updatedBlog.user.username);
      dispatch(likeBlog(updatedBlog));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteBlogThunk = (
  id,
  blogToDelete,
  setError,
  resetNotification
) => {
  return async (dispatch) => {
    try {
      const deletedBlog = await BlogService.remove(id, blogToDelete);
      console.log(deletedBlog);
      dispatch(deleteBlog(deletedBlog));
      dispatch(getAllBlogs());
    } catch (err) {
      setError(true);
      dispatch(setNotification(err.response.data.error));
      resetNotification();
    }
  };
};

export const { getBlogs, appendBlog, likeBlog, deleteBlog } =
  blogsSlice.actions;

export default blogsSlice.reducer;
