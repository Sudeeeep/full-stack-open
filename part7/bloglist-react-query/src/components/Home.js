import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

export const Home = ({ blogs, blogRef, createBlog }) => {
  return (
    <div>
      <Togglable buttonLabel="New Blog" ref={blogRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.data
        .sort((a, b) => (a.likes < b.likes ? 1 : -1))
        .map((blog) => (
          <Blog key={blog.id} currentBlog={blog} />
        ))}
    </div>
  );
};

export default Home;
