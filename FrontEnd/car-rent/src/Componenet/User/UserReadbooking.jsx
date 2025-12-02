import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserReadbooking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const fetchBookings = useCallback(async (userId, token) => {
    try {
      const res = await axios.get(`http://localhost:2530/booking/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      alert("Failed to fetch bookings");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      fetchBookings(decoded.id, token);
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  }, [fetchBookings, navigate]);

  useEffect(() => {
    const updated = location.state?.updatedBooking;
    if (!updated) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? { ...b, paymentStatus: updated.paymentStatus } : b))
    );
  }, [location.state]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:2530/booking/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking");
    }
  };

  const startEdit = (booking) => {
    setEditId(booking.id);
    setEditValues({
      start_date: booking.start_date?.split("T")[0],
      end_date: booking.end_date?.split("T")[0],
      status: booking.status,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValues({});
  };

  const saveEdit = async (id) => {
    try {
      const updated = { ...editValues };
      await axios.put(`http://localhost:2530/updatebookingal/${id}`, updated);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("Failed to update booking");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!bookings.length) return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="relative bg-white shadow rounded overflow-hidden hover:shadow-lg transition flex flex-col border-2 border-transparent"
          >
            <span
              className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full ${
                booking.paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {booking.paymentStatus === "paid" ? "Paid" : "Unpaid"}
            </span>

            {booking.url && (
              <img
                src={`http://localhost:2530/cars/${booking.url}`}
                alt={booking.carName}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-4 flex flex-col gap-2">
              <p>
                <strong>Booking ID:</strong> {booking.id}
              </p>
              <p>
                <strong>Car Name:</strong> {booking.carName}
              </p>

              {editId === booking.id ? (
                <>
                  <div>
                    <label>Start Date:</label>
                    <input
                      type="date"
                      value={editValues.start_date}
                      onChange={(e) => setEditValues({ ...editValues, start_date: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  </div>
                  <div>
                    <label>End Date:</label>
                    <input
                      type="date"
                      value={editValues.end_date}
                      onChange={(e) => setEditValues({ ...editValues, end_date: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  </div>
                  <div>
                    <label>Status:</label>
                    <select
                      value={editValues.status}
                      onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}
                      className="border rounded p-1 w-full"
                    >
                      <option value="booked">Booked</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveEdit(booking.id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {new Date(booking.start_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {booking.end_date ? new Date(booking.end_date).toLocaleDateString() : "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p>
                    <strong>Payment:</strong> {booking.paymentStatus || "Not Paid"}
                  </p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(booking)}
                      className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    {booking.paymentStatus !== "paid" && (
                      <button
                        onClick={() =>
                          navigate(`/user/payment/${booking.id}`, { state: { booking } })
                        }
                        className="flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReadbooking;
