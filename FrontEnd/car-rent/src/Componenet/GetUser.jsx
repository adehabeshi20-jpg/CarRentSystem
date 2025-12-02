import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GetUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2530/users")
      .then(res => {
        setUsers(Array.isArray(res.data.users) ? res.data.users : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading users...</p>;
  if (users.length === 0) return <p className="text-center">No users found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Users List
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "First Name", "Last Name", "Email", "Phone", "Created At", "Actions"].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-4 py-4 text-sm text-gray-600">{user.id}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.Fname}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.Lname}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{user.phone}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{new Date(user.created_at).toLocaleString()}</td>
                <td className="px-4 py-4 flex gap-2">
                  {/* View */}
                    <Link
                      to={`/user/view/${user.id}`}  // now points to UserView
                      className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 transition"
                    >
                      View
                    </Link>

                    {/* Update */}
              <Link to={`/userupdate/${user.id}`}
                      className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition"
                    >
                      Update
              </Link>

                  {/* Delete */}
                  <button
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this user?")) {
                        try {
                          await axios.delete(`http://localhost:2530/user/${user.id}`);
                          alert("User deleted successfully");
                          navigate("/admin/GetUser"); // stay in admin page
                        } catch (err) {
                          console.error(err);
                          alert("Failed to delete user");
                        }
                      }
                    }}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetUser;
