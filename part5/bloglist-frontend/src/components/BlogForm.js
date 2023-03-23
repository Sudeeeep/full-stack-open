import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  blogs,
  setBlogs,
  setError,
  setNotification,
  resetNotification,
  blogRef,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs([...blogs, newBlog]);
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
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
