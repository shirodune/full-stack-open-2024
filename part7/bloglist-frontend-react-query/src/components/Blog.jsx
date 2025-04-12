import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from '../services/blogs';

const Blog = ({ blog, user }) => {

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenUser = {
    display: user && user.username === blog.user.username ? "" : "none",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleClikeLike = async (event) => {
    event.preventDefault();
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  };

  const handleClikeDelete = async (event) => {
    event.preventDefault();
    try {
      if (
        window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      ) {
        deleteMutation.mutate(blog.id)
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible === false ? "show" : "hide"}
        </button>
      </div>
      <div className="details" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleClikeLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showWhenUser}>
          <button onClick={handleClikeDelete}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
