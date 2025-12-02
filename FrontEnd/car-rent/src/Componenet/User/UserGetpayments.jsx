import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserGetpayments = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

const fetchUserPayments = useCallback(
  async (id) => {  
    try {
      const res = await axios.get(`http://localhost:2530/payment/user/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const payData = res.data.payments || [];
      setPayments(Array.isArray(payData) ? payData : [payData]);
    } catch (error) {
      console.error("Failed to fetch payment data:", error);
      alert("Failed to fetch payment data");
    }
  },
  [userToken]
);


  useEffect(() => {
    if (!userToken) {
      navigate("/login");
      return;
    }
    if (userId) {
      fetchUserPayments(userId);
    }
  }, [userToken, userId, navigate, fetchUserPayments]);

  if (payments.length === 0)
    return <p className="text-center mt-10">No payment information found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Your Payments & Bookings</h1>

      <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Payment ID",
                "Booking ID",
                "Car",
                "Start Date",
                "End Date",
                "Booking Status",
                "Amount",
                "Payment Method",
                "Payment Status",
              ].map((header, idx) => (
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
            {payments.map((p) => (
              <tr key={p.payment_id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 text-sm text-gray-600">{p.payment_id}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{p.booking_id}</td>

                <td className="px-4 py-4 text-sm text-gray-600 flex items-center gap-2">
                  {p.carUrl && (
                    <img
                      src={`http://localhost:2530/cars/${p.carUrl}`}
                      alt={p.carName}
                      className="w-12 h-8 object-cover rounded"
                    />
                  )}
                  <span>{p.carName}</span>
                </td>

                <td className="px-4 py-4 text-sm text-gray-600">
                  {new Date(p.start_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {new Date(p.end_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{p.booking_status}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{p.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{p.payment_method}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserGetpayments;
