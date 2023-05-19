import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationSlice";
import {
  createBlogThunk,
  deleteBlogThunk,
  getAllBlogs,
  likeBlogThunk,
} from "./reducers/BlogsSlice";
import { login, setUser } from "./reducers/userSlice";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const blogRef = useRef();

  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(
      login(
        username,
        password,
        setUsername,
        setPassword,
        setError,
        resetNotification
      )
    );
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInBlogUser");
    dispatch(setUser(null));
  };

  const resetNotification = () => {
    setTimeout(() => {
      dispatch(setNotification(null));
      setError(false);
    }, 5000);
  };

  const createBlog = async (title, author, url) => {
    dispatch(
      createBlogThunk({ title, author, url }, setError, resetNotification)
    );
    blogRef.current.toggleVisibility();
    setError(false);
    dispatch(setNotification(`A new blog ${title} by ${author}`));
    resetNotification();
  };

  const likeBlog = async (id, updatedBlog) => {
    dispatch(likeBlogThunk(id, updatedBlog));
    dispatch(getAllBlogs());
  };

  const deleteBlog = async (id, currentBlog) => {
    dispatch(deleteBlogThunk(id, currentBlog, setError, resetNotification));
    dispatch(getAllBlogs());
  };

  if (user === null) {
    return (
      <div>
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
          notification={notification}
          error={error}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isError={error} />
      <h3>
        {user.name} logged in{" "}
        <button id="logout-btn" onClick={handleLogOut}>
          logout
        </button>
      </h3>
      <Togglable buttonLabel="New Blog" ref={blogRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            username={user.username}
            currentBlog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        );
      })}
    </div>
  );
};

export default App;
