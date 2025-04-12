import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setUser, Login } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";


const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(Login(username, password));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification("Wrong credentials", 5000));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedblogappUser");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </div>
      )}
      <BlogList />
      <UserList />
    </div>
  );
};

export default App;
