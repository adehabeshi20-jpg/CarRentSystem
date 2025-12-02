import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Getdatabookin = () => {
  const [data, setData] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate =useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:2530/booking");
      setData(Array.isArray(res.data.booking) ? res.data.booking : []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const handelview = async (id) => {
    try {
      const res = await axios.get(`http://localhost:2530/booking/${id}`);
      setSelectedBooking(res.data.booking || res.data.result || res.data);
    } catch (error) {
      console.error("Failed to get booking data:", error);
      alert("Failed to get booking data");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:2530/booking/${id}`);
        setData(data.filter((d) => d.id !== id));
      } catch (err) {
        console.error("Failed to delete booking:", err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <div className="min-vh-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Owner Dashboard
      </h1>

      {/* Booking Table */}
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["Booking ID", "User_Id", "Start Date", "End Date", "Status", "Read", "Update", "Delete"].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((d, i) => (
                <tr key={d.id || i} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-4 text-sm text-gray-600">{d.id || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.user_id || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.start_date || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.end_date || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.status || "-"}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handelview(d.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Read
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/admin/Getdatabookin/updatebookingal/${d.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      Update
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                      <Link to={"/admin/"}
                      className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                      Back</Link>
                  </td>
                </tr>
                
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500 text-sm">
                  No booking data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Booking Details */}
      {selectedBooking && (
        <div className="mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-200
        bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Booking Details</h2>
          <p><strong>ID:</strong> {selectedBooking.id}</p>
          <p><strong>User ID:</strong> {selectedBooking.user_id}</p>
          <p><strong>Start Date:</strong> {selectedBooking.start_date}</p>
          <p><strong>End Date:</strong> {selectedBooking.end_date}</p>
          <p><strong>Status:</strong> {selectedBooking.status}</p>
              <button 
      onClick={() => navigate(0)}
      className="mb-9 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition
      bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500"
    >
      Cancel
    </button>
        </div>
      )}
    </div>
  );
};

export default Getdatabookin;
