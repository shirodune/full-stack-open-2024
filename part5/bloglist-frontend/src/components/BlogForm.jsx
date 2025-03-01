import { useState } from "react"

const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
      event.preventDefault()
  
      try {
        await createBlog({
          title, author, url
        })
        setMessage(`a new blog ${title} by ${author}`)   
        setTimeout(() => {
          setMessage(null)
        }, 5000)   
        setTitle('')
        setAuthor('')
        setUrl('')
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        console.log(exception);
        
      }
    }

  return (
    <div>
      <h2>Create One</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm