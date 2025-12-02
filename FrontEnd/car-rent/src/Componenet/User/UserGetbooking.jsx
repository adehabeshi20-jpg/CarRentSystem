import React, { useEffect, useState } from "react";
import axios from "axios";

const UserGetbooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:2530/booking/user/${user.id}`)
      .then((res) => {
        setBookings(res.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;
  if (!user) return <p className="text-center mt-10">Login required.</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Your Booking History</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white shadow rounded overflow-hidden">
              {/* Car Image */}
              <img
                src={`http://localhost:2530/cars/${b.image_url}`}
                alt={b.car_name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold text-blue-600">{b.car_name}</h2>
                <p className="text-gray-700 mb-2">Price per day: ${b.price}</p>

                <p><strong>Booking ID:</strong> {b.id}</p>
                <p><strong>Start Date:</strong> {b.start_date}</p>
                <p><strong>End Date:</strong> {b.end_date}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={b.status === "booked" ? "text-green-600" : "text-red-600"}>
                    {b.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGetbooking;
