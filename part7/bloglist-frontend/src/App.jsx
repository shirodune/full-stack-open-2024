import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const blogs = useSelector(
    state => state.blogs
  )

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", 5000));
    }
  };

  const logout = () => {
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
            <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef}/>
          </Togglable>
        </div>
      )}
      <h2>Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
