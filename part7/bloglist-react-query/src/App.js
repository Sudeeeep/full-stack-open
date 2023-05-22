import { useState, useEffect, useRef, useReducer } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Notification from "./components/Notification";
import notificationReducer from "./reducers/notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
import userReducer from "./reducers/users";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Home from "./components/Home";
import User from "./components/User";
import BlogDetails from "./components/blogDetails";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    null
  );
  const [user, dispatchUser] = useReducer(userReducer, null);

  const blogRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatchUser({ type: "set_user", payload: user });
    }
  }, []);

  const queryClient = useQueryClient();

  const blogs = useQuery(["blogs"], blogService.getAll);

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (err) => {
      setError(true);
      dispatchNotification({
        type: "set_notification",
        payload: err.response.data.error,
      });
      resetNotification();
    },
  });

  const likeBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (err) => {
      setError(true);
      dispatchNotification({
        type: "set_notification",
        payload: err.response.data.error,
      });
      resetNotification();
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      dispatchUser({ type: "set_user", payload: user });
      setUsername("");
      setPassword("");
      setError(false);
    } catch (err) {
      setError(true);
      dispatchNotification({
        type: "set_notification",
        payload: err.response.data.error,
      });
      resetNotification();
      setUsername("");
      setPassword("");
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInBlogUser");
    dispatchUser({ type: "reset" });
  };

  const resetNotification = () => {
    setTimeout(() => {
      dispatchNotification({ type: "reset" });
      setError(false);
    }, 5000);
  };

  const createBlog = async (title, author, url) => {
    createBlogMutation.mutate({ title, author, url });
    setError(false);
    dispatchNotification({
      type: "set_notification",
      payload: `A new blog ${title} by ${author}`,
    });
    resetNotification();
    blogRef.current.toggleVisibility();
  };

  const likeBlog = async (id, updatedBlog) => {
    try {
      likeBlogMutation.mutate({ id, updatedBlog });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id) => {
    deleteBlogMutation.mutate(id);
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

  if (user !== null && blogs.isLoading) {
    return <h2>LOADING..</h2>;
  }

  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <div>
          <span style={{ fontWeight: "bold" }}>{user.name} logged in </span>
          <button id="logout-btn" onClick={handleLogOut}>
            logout
          </button>
        </div>
      </nav>

      <h2>Blog App</h2>
      <Notification message={notification} isError={error} />

      <Routes>
        <Route
          path="/"
          element={
            <Home blogs={blogs} blogRef={blogRef} createBlog={createBlog} />
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogDetails
              blogs={blogs.data}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          }
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
