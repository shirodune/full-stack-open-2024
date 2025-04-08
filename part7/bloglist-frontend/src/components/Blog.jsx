import { useState } from "react";

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const showWhenUser = {
    display: user && user.username === blog.user.username ? "" : "none",
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleClike = async (event) => {
    event.preventDefault();
    try {
      await addLike({ ...blog, likes: blog.likes + 1 });
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleClikeDelete = async (event) => {
    event.preventDefault();
    try {
      await removeBlog(blog);
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
          <button onClick={handleClike}>like</button>
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
