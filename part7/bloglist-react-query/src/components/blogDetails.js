import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = ({ blogs, likeBlog, user, deleteBlog, addComment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedBlog = blogs.filter((blog) => blog.id === id);

  const displayRemoveButton =
    user.username === selectedBlog[0].user.username ? true : false;

  const handleLike = async () => {
    const updatedBlog = {
      title: selectedBlog[0].title,
      author: selectedBlog[0].author,
      url: selectedBlog[0].url,
      likes: selectedBlog[0].likes + 1,
    };
    likeBlog(selectedBlog[0].id, updatedBlog);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Remove blog ${selectedBlog[0].name} by ${selectedBlog[0].author}`
      )
    ) {
      console.log(selectedBlog[0]);
      console.log(localStorage.getItem("loggedInBlogUser"));
      deleteBlog(selectedBlog[0].id);
      navigate("/");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();

    const updatedBlog = {
      title: selectedBlog[0].title,
      author: selectedBlog[0].author,
      url: selectedBlog[0].url,
      likes: selectedBlog[0].likes,
      comments: selectedBlog[0].comments.concat(e.target.comments.value),
    };
    addComment(selectedBlog[0].id, updatedBlog);
    e.target.comments.value = "";
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>
        {selectedBlog[0].title} by {selectedBlog[0].author}
      </h2>
      <a href={selectedBlog[0].url} target="_blank" rel="noreferrer">
        {selectedBlog[0].url}
      </a>
      <div>
        <span>{selectedBlog[0].likes} likes</span>{" "}
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
        </button>
        <p style={{ marginTop: 0 }}>added by {selectedBlog[0].user.name}</p>
      </div>

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
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input name="comments" type="text" placeholder="Add a comment..." />
        <button>add comment</button>
      </form>
      <ul>
        {selectedBlog[0].comments.map((comment, index) => {
          return <li key={index}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogDetails;
