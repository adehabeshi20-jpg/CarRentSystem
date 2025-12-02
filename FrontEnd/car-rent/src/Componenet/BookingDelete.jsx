import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const BookingDelete = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:2530/booking");
      setData(Array.isArray(res.data.booking) ? res.data.booking : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:2530/booking/${id}`);
        setData(data.filter((d) => d.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
  <div className="min-vh-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Owner Dashboard</h1>
      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["ID","Amount","Start","End","Payment","Status","Paid At","Read","Update","Delete"].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-sm text-gray-600">{d.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.amount || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.start_date || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.end_date || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.payment || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{d.status || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {d.paid_at ? new Date(d.paid_at).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-4">
                    <Link to={`/read_booking/${d.id}`} className="bg-blue-500 text-white px-3 py-1 rounded">Read</Link>
                  </td>
                  <td className="px-4 py-4">
                    <Link to={`/updatebookingal/${d.id}`} className="bg-green-500 text-white px-3 py-1 rounded">Update</Link>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-4 text-center text-gray-500">No booking data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BookingDelete