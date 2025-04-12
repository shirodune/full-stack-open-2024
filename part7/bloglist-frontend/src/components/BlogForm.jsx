import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisibility();

      dispatch(
        createBlog({
          title,
          author,
          url,
        }),
      );
      dispatch(setNotification(`a new blog ${title} by ${author}`, 5000));
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h2>Create One</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            data-testid="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write a title"
          />
        </div>
        <div>
          author:
          <input
            data-testid="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write a author"
          />
        </div>
        <div>
          url:
          <input
            data-testid="url"
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write a url"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
