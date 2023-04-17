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
      console.log(user);

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

  const createBlog = async (title, author, url) => {
    try {
      const newBlog = await blogService.create({ title, author, url });
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      setError(false);
      setNotification(`A new blog ${newBlog.title} by ${newBlog.author}`);
      resetNotification();
      blogRef.current.toggleVisibility();
    } catch (err) {
      setError(true);
      setNotification(err.response.data.error);
      resetNotification();
    }
  };

  const likeBlog = async (id, updatedBlog) => {
    try {
      await blogService.update(id, updatedBlog);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlog = async (id, currentBlog) => {
    try {
      await blogService.remove(id, currentBlog);
      const blogsAfterRemove = blogs.filter(
        (blog) => blog.id !== currentBlog.id
      );
      setBlogs(blogsAfterRemove);
    } catch (err) {
      setError(true);
      setNotification(err.response.data.error);
      resetNotification();
    }
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
      {blogs
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map((blog) => (
          <Blog
            key={blog.id}
            username={user.username}
            currentBlog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
