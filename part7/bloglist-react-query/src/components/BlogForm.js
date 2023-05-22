import React from "react";
import { useState } from "react";
import { Button } from "./style/Button.styled";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    createBlog(title, author, url);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="titleInput"
            style={{ marginBottom: "0.5rem" }}
          />
        </div>
        <div>
          author:{" "}
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="authorInput"
            style={{ marginBottom: "0.5rem" }}
          />
        </div>
        <div>
          url:{" "}
          <input
            id="url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="urlInput"
            style={{ marginBottom: "0.5rem" }}
          />
        </div>
        <Button
          style={{ margin: "0.25rem" }}
          id="create-blog-btn"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
