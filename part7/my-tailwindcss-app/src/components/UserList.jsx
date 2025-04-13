import { useSelector } from "react-redux"
import { Link} from 'react-router'

const UserList = () => {
  const users = useSelector((state) => state.users)

return (
  <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Users</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="px-4 py-2 font-semibold">User</th>
            <th className="px-4 py-2 font-semibold">Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition">
              <td className="px-4 py-2">
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.name}
                </Link>
              </td>
              <td className="px-4 py-2">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

  
}

export default UserList