import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ currentBlog, blogs, setBlogs }) => {
  const [moreDetails, setMoreDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updatedBlog = {
      title: currentBlog.title,
      author: currentBlog.author,
      url: currentBlog.url,
      likes: currentBlog.likes + 1,
    };

    console.log(currentBlog.id);

    const newBlog = await blogService.update(currentBlog.id, updatedBlog);
    console.log(newBlog);
    const allBlogs = await blogService.getAll();
    setBlogs(allBlogs);
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
          likes {currentBlog.likes} <button onClick={handleLike}>like</button>{" "}
          <br />
          {currentBlog.user.name}
        </div>
      </div>
    );
  }
};

export default Blog;
