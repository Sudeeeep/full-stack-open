import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("libraryUserToken", token);
    }
  }, [data]); //eslint-disable-line

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    // console.log(data.login);

    setUsername("");
    setPassword("");
    setPage("books");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>log in</button>
      </form>
    </>
  );
};

export default Login;
