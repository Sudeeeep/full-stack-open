import { useQuery } from "react-query";
import { getAll } from "../services/users";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useQuery(["users"], getAll);

  if (users.isLoading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {users.data.map((user) => {
                return (
                  <div key={user.id}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/users/${user.id}`}
                    >
                      {user.name}
                    </Link>
                  </div>
                );
              })}
            </td>
            <td>
              {users.data.map((user) => {
                return <div key={user.id}>{user.blogs.length}</div>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
