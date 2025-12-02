import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2530/admin")
      .then(res => {
        setAdmins(Array.isArray(res.data.admins) ? res.data.admins : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching admins:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading admins...</p>;
  if (admins.length === 0) return <p className="text-center">No admins found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Admins List
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "First Name", "Last Name", "Email", "Phone", "Created At", "Super Admin", "Actions"].map((header, idx) => (
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
            {admins.map(admin => (
              <tr key={admin.id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-4 py-4 text-sm text-gray-600">{admin.id}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{admin.Fname}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{admin.Lname}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{admin.email}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{admin.phone}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{new Date(admin.created_at).toLocaleString()}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{admin.is_super ? "Yes" : "No"}</td>
                <td className="px-4 py-4 flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/view/${admin.id}`)}
                    className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/update/${admin.id}`)}
                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate(`/admin/delete/${admin.id}`)}
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

export default GetAdmins;
