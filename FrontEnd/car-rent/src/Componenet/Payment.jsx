import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [formData, setFormData] = useState({
    booking_id: "",
    amount: "",
    payment_method: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:2530/payments", formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Payment submission failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400 p-8 rounded-2xl shadow-md w-full text-white max-w-2xl"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Payment Details
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Booking ID</label>
            <input
              type="text"
              name="booking_id"
              value={formData.booking_id}
              onChange={handleChange}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Payment Method</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="border p-2 bg-black rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 bg-black rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-700 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
