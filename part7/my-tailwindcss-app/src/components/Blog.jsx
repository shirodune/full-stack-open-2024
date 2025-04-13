import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { addLike, removeBLog, createComment } from "../reducers/blogReducer";

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

  const handleClikeAddComment = async (event) => {
    event.preventDefault();
    const content = event.target.comment.value
    event.target.comment.value = ''
    try {
      dispatch(createComment({content, blogId: blog.id}));
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h2>
  
      <div className="space-y-4 text-gray-700">
        <div>
          <a href={blog.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
  
        <div className="flex items-center gap-2">
          <span>{blog.likes} likes</span>
          <button
            onClick={handleClikeLike}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Like
          </button>
        </div>
  
        <div>Added by <span className="font-medium">{blog.user.name}</span></div>
  
        <div style={showWhenUser}>
          <button
            onClick={handleClikeDelete}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
  
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Comments</h3>
        <form onSubmit={handleClikeAddComment} className="flex gap-2 mb-4">
          <input
            name="comment"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write a comment..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add Comment
          </button>
        </form>
        <ul className="space-y-2 list-disc pl-5 text-gray-700">
          {blog.comments?.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default Blog;
