import { useParams } from "react-router"
import { useSelector } from "react-redux"

const User = () => {
  let { id } = useParams();
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if(!user) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Added Blogs</h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )  
}

export default User