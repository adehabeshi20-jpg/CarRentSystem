import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:2530/fullinfobooking");
      setBookings(res.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await axios.delete(`http://localhost:2530/deletebooking/${id}`);
      alert(response.data.message);
      setBookings(bookings.filter((b) => b.booking_id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking!");
    }
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div>
      <h2>Booking List</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Car</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.booking_id}>
                <td>{b.booking_id}</td>
                <td>{b.user_name || `${b.Fname} ${b.Lname}`}</td>
                <td>{b.car_model}</td>
                <td>{b.start_date}</td>
                <td>{b.end_date}</td>
                <td>{b.status}</td>
                <td>
                  <button
                    style={{
                      color: "white",
                      backgroundColor: "red",
                      padding: "5px 10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => deleteBooking(b.booking_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DeleteBooking;
