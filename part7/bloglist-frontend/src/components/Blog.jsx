import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { addLike, removeBLog } from "../reducers/blogReducer";

const Blog = () => {
  let { id } = useParams()

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const showWhenUser = {
    display: user && user.username === blog.user.username ? "" : "none",
  };

  const handleClikeLike = async (event) => {
    event.preventDefault();
    try {
      dispatch(addLike({ ...blog, likes: blog.likes + 1 }));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleClikeDelete = async (event) => {
    event.preventDefault();
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(removeBLog(blog));
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div className="details">
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={handleClikeLike}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        <div style={showWhenUser}>
          <button onClick={handleClikeDelete}>remove</button>
        </div>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments?.map((comment) => <li key={comment.id}>{comment.content}</li>)}
      </ul>
    </div>
  );
};

export default Blog;
