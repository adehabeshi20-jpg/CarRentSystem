import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const ReadBooking = () => {
const [data, setData] = useState([]);
const [selectedBooking, setSelectedBooking] = useState(null);
const [userId, setUserId] = useState(null);
const [isAdmin, setIsAdmin] = useState(false);
;

useEffect(() => {
const token = localStorage.getItem("token");
if (token) {
const decoded = jwtDecode(token);
setUserId(decoded.id);
setIsAdmin(decoded.role === "admin");
}
fetchBookings();
}, []);

const fetchBookings = async () => {
try {
const res = await axios.get("http://localhost:2530/booking");
setData(Array.isArray(res.data) ? res.data : []);
} catch (err) {
console.error("Failed to fetch bookings:", err);
}
};

const handleView = async (id) => {
try {
const res = await axios.get(`http://localhost:2530/booking/${id}`);
const booking = res.data.booking || res.data || res.data.result;
  if (isAdmin || booking.user_id === userId) {
    setSelectedBooking(booking);
  } else {
    alert("You can only view your own booking.");
  }
} catch (err) {
  console.error("Failed to get booking data:", err);
  alert("Failed to get booking data");
}
};

const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toLocaleDateString() : "-");

return ( <div className="min-vh-screen bg-gray-50 p-6"> <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Owner Dashboard</h1>

  <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 bg-white">
      <thead className="bg-gray-100">
        <tr>
          {["Booking ID", "User ID", "Start Date", "End Date", "Status", "Read"].map(
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
          data.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50 transition duration-150">
              <td className="px-4 py-4 text-sm text-gray-600">{d.id}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{d.user_id}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{formatDate(d.start_date)}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{formatDate(d.end_date)}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{d.status}</td>
              <td className="px-4 py-4">
                <button
                  onClick={() => handleView(d.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Read
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="px-6 py-4 text-center text-gray-500 text-sm">
              No booking data found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {selectedBooking && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Booking Details</h2>
        <p>
          <strong>ID:</strong> {selectedBooking.id}
        </p>
        <p>
          <strong>User ID:</strong> {selectedBooking.user_id}
        </p>
        <p>
          <strong>Start Date:</strong> {formatDate(selectedBooking.start_date)}
        </p>
        <p>
          <strong>End Date:</strong> {formatDate(selectedBooking.end_date)}
        </p>
        <p>
          <strong>Status:</strong> {selectedBooking.status}
        </p>
        <button
          onClick={() => setSelectedBooking(null)}
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>

);
};

export default ReadBooking;
