import { useState } from "react";

const Blog = ({ blog }) => {
  const [moreDetails, setMoreDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!moreDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setMoreDetails(true)}>view</button>
        </div>
      </div>
    );
  }

  if (moreDetails) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}{" "}
          <button onClick={() => setMoreDetails(false)}>hide</button> <br />
          {blog.url} <br />
          likes {blog.likes} <button>like</button> <br />
          {blog.user.name}
        </div>
      </div>
    );
  }
};

export default Blog;
