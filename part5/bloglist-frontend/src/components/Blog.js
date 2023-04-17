import React from "react";
import { useState } from "react";

const Blog = ({ username, currentBlog, likeBlog, deleteBlog }) => {
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
    likeBlog(currentBlog.id, updatedBlog);
  };

  const handleDelete = async () => {
    if (
      window.confirm(`Remove blog ${currentBlog.name} by ${currentBlog.author}`)
    ) {
      console.log(currentBlog);
      console.log(localStorage.getItem("loggedInBlogUser"));
      deleteBlog(currentBlog.id, currentBlog);
    }
  };

  if (!moreDetails) {
    return (
      <div style={blogStyle}>
        <div className="blogDiv">
          <span className="title">{currentBlog.title}</span>{" "}
          <span className="author">{currentBlog.author}</span>
          <button className="viewBtn" onClick={() => setMoreDetails(true)}>
            view
          </button>
        </div>
      </div>
    );
  }

  if (moreDetails) {
    return (
      <div style={blogStyle}>
        <div className="detailedBlog">
          <span className="title">{currentBlog.title}</span>{" "}
          <span className="author">{currentBlog.author}</span>
          <button onClick={() => setMoreDetails(false)}>hide</button> <br />
          <div className="url">{currentBlog.url}</div>
          <span className="likes"> likes {currentBlog.likes}</span>
          <button
            className="likeBtn"
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
          <span className="user">{currentBlog.user.name}</span>
          <br />
          <div>
            {displayRemoveButton && (
              <button
                className="deleteBtn"
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
