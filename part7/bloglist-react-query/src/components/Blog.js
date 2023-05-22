import React from "react";

import { Link } from "react-router-dom";

const Blog = ({ currentBlog }) => {
  const blogStyle = {
    padding: "10px 5px 5px 5px",
    border: "solid",
    borderWidth: 1,
    margin: "10px 0 10px 0",
  };

  return (
    <div style={blogStyle}>
      <div className="blogDiv">
        <Link className="title" to={`/blogs/${currentBlog.id}`}>
          {currentBlog.title} by {currentBlog.author}
        </Link>{" "}
      </div>
    </div>
  );
};

export default Blog;
