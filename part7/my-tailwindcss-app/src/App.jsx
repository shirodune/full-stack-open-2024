import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, NavLink } from "react-router";

import BlogList from "./components/BlogList";
import UserList from "./components/UserList";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setUser, Login } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";

import User from "./components/User";
import Blog from "./components/Blog";

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
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          data-testid="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
  

  return (
    <div>
      <div className="bg-white shadow-md">
        <ul className="flex border-b p-4 gap-6 text-lg text-[#2E4053] items-center justify-between">
          <div className="flex gap-6">
            <li className="cursor-pointer hover:bg-[#E8DAEF] px-4 py-2 rounded-md transition-all">
              <NavLink to="/" end className="hover:underline">Blogs</NavLink>
            </li>
            <li className="cursor-pointer hover:bg-[#E8DAEF] px-4 py-2 rounded-md transition-all">
              <NavLink to="/users" end className="hover:underline">Users</NavLink>
            </li>
          </div>
          <li className="flex items-center gap-4 text-sm">
            {user === null ? (
              loginForm()
            ) : (
              <>
                <span className="text-gray-700 font-medium">{user.name} logged in</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
                <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                  <BlogForm blogFormRef={blogFormRef} />
                </Togglable>
              </>
            )}
          </li>
        </ul>
      </div>


      <Notification />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
