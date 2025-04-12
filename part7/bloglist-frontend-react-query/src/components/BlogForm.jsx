import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from '../services/blogs';
import { useNotify } from "../NotificationContext";

const BlogForm = ({ blogFormRef }) => {
  const queryClient = useQueryClient()
  const notifyWith = useNotify()

  const blogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: ({ title, author }) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      notifyWith(`a new blog ${title} by ${author}`)
    },
    onError: (error) => {
      notifyWith(error.response.data.error)
    }
  })

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();

    setTitle("");
    setAuthor("");
    setUrl("");
    blogFormRef.current.toggleVisibility();

    blogMutation.mutate({ title, author, url })
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
