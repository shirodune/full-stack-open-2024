import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from './services/blogs';

import { useNotify } from "./NotificationContext";
import { useUserValue, useLogin, useLogout, useSetUser } from "./UserContext";


const App = () => {
  const query = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })
  const notifyWith = useNotify()
  const user = useUserValue()
  const login = useLogin()
  const logout = useLogout()
  const setUser = useSetUser()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON && loggedUserJSON !== "null") {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if ( query.isLoading ) {
    return <div>loading data...</div>
  }

  if ( query.isError) {
    return (
      <div>
        blog service not available due to problems in server
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const result = await login({username, password})
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(result));
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifyWith("Wrong credentials")
      console.log(exception);
    }
  };

  const handleLogout = () => {
    logout()
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
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef}/>
          </Togglable>
        </div>
      )}
      <h2>Blogs</h2>
      {query.data?.toSorted((a, b) => b.likes - a.likes)
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
