import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({
  username,
  currentBlog,
  blogs,
  setBlogs,
  setError,
  setNotification,
  resetNotification,
}) => {
  const [moreDetails, setMoreDetails] = useState(false);

  const displayRemoveButton =
    username === currentBlog.user.username ? true : false;

  const blogStyle = {
    padding: "10px 5px 5px 5px",
    border: "solid",
    borderWidth: 1,
    margin: "10px 0 10px 0",
  };

  const handleLike = async () => {
    const updatedBlog = {
      title: currentBlog.title,
      author: currentBlog.author,
      url: currentBlog.url,
      likes: currentBlog.likes + 1,
    };
    try {
      await blogService.update(currentBlog.id, updatedBlog);
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Remove blog ${currentBlog.name} by ${currentBlog.author}`)
    ) {
      try {
        await blogService.remove(currentBlog.id, currentBlog);
        const blogsAfterRemove = blogs.filter(
          (blog) => blog.id !== currentBlog.id
        );
        setBlogs(blogsAfterRemove);
      } catch (err) {
        setError(true);
        setNotification(err.response.data.error);
        resetNotification();
      }
    }
  };

  if (!moreDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {currentBlog.title} {currentBlog.author}
          <button onClick={() => setMoreDetails(true)}>view</button>
        </div>
      </div>
    );
  }

  if (moreDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {currentBlog.title} {currentBlog.author}{" "}
          <button onClick={() => setMoreDetails(false)}>hide</button> <br />
          {currentBlog.url} <br />
          likes {currentBlog.likes}{" "}
          <button
            onClick={handleLike}
            style={{
              backgroundColor: "#4286F6",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              padding: "0.25em 0.5em",
            }}
          >
            like
          </button>{" "}
          <br />
          {currentBlog.user.name}
          <br />
          <div>
            {displayRemoveButton && (
              <button
                onClick={handleDelete}
                style={{
                  backgroundColor: "#cc243c",
                  color: "white",
                  border: "none",
                  borderRadius: "0.25rem",
                  padding: "0.25em",
                }}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Blog;
