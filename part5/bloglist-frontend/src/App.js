import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
      setError(false);
    } catch (err) {
      setError(true);
      setNotification(err.response.data.error);
      resetNotification();
      setUsername("");
      setPassword("");
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedInBlogUser");
    setUser(null);
  };

  const resetNotification = () => {
    setTimeout(() => {
      setNotification(null);
      setError(false);
    }, 5000);
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
        {user.name} logged in <button onClick={handleLogOut}>logout</button>
      </h3>
      <Togglable buttonLabel="New Blog" ref={blogRef}>
        <BlogForm
          setBlogs={setBlogs}
          setError={setError}
          setNotification={setNotification}
          resetNotification={resetNotification}
          blogRef={blogRef}
        />
      </Togglable>
      {blogs
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map((blog) => (
          <Blog
            key={blog.id}
            username={user.username}
            currentBlog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
            setError={setError}
            setNotification={setNotification}
            resetNotification={resetNotification}
          />
        ))}
    </div>
  );
};

export default App;
