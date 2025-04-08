import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 10000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedblogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = async (blogObejct) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObejct)
    setBlogs(blogs.concat(newBlog))
  }

  const addLike = async (blogObejct) => {
    const updateBlog = await blogService.update(blogObejct)
    setBlogs(blogs.filter(blog => blog.id !== updateBlog.id).concat(updateBlog))
  }

  const removeBlog = async (blogObejct) => {
    if (window.confirm(`Remove blog ${blogObejct.title} by ${blogObejct.author}`)) {
      const result = await blogService.deleteBlog(blogObejct.id)
      setBlogs(blogs.filter(blog => blog.id !== blogObejct.id))
    }
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} />

      {user === null ?
        loginForm() :
        <div>
          <p>
            {user.name} logged-in
            <button onClick={logout}>logout</button>
          </p>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} setMessage={setMessage}/>
          </Togglable>
        </div>
      }
      <h2>Blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App