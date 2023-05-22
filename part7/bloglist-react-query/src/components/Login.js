import Notification from "./Notification";
import { Button } from "./style/Button.styled";

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
  notification,
  error,
}) => {
  return (
    <div>
      <h1>LOG IN TO APPLICATION</h1>
      <Notification message={notification} isError={error} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            style={{ margin: "0.25rem" }}
          />
        </div>

        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "0.25rem" }}
          />
        </div>
        <Button id="submit-btn" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
