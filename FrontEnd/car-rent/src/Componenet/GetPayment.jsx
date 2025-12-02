import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GetPayment = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2530/payment")
      .then(res => {
        // Correct key: payments (from backend)
        setPayments(Array.isArray(res.data.payments) ? res.data.payments : []);
      })
      .catch(err => console.error("Error fetching payments:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Payment Dashboard  
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {["Booking ID", "Amount", "Payment", "Status", "Paid At", "Actions"].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  colSpan={header === "Actions" ? 3 : 1}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {payments.length > 0 ? (
              payments.map(p => (
                <tr key={p.booking_id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-4 py-4 text-sm text-gray-600">{p.booking_id || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{p.amount || 0}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{p.payment || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{p.status || "-"}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{p.paid_at ? new Date(p.paid_at).toLocaleString() : "-"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/read_booking/${p.booking_id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Read
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/Getdatabookin/updatebookingal/${p.booking_id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/BookingDelete/${p.booking_id}`)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500 text-sm">
                  No payment data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetPayment;
