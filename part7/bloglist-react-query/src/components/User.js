import { Link, useParams } from "react-router-dom";
import { getAll } from "../services/users";
import { useQuery } from "react-query";

const User = () => {
  const { id } = useParams();

  const allUsers = useQuery(["users"], getAll);

  if (allUsers.isLoading) {
    return <h1>LOADING...</h1>;
  }

  const selectedUser = allUsers.data.filter((user) => user.id === id);

  return (
    <div>
      <h2>{selectedUser[0].name}</h2>
      <h4>Added blogs:</h4>
      <ul>
        {selectedUser[0].blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default User;
