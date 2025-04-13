import { useSelector } from "react-redux"
import { Link } from "react-router"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">Blog App</h2>
      <ul className="space-y-4">
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li
              key={blog.id}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {blog.title}
              </Link>
              <p className="text-sm text-gray-500">{blog.likes} likes</p>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList