import Notification from "./Notification";

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
          />
        </div>
        <button id="submit-btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
