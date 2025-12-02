import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bgimg from "../../assets/Image/Black Tesla.jpg";

const UserDashboard = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (!userToken || !userId) navigate("/login");
  }, [navigate, userToken, userId]);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`http://localhost:2530/bookings/${userId}`);
        setBooking(res.data.booking); 
      } catch (err) {
        console.error("Failed to fetch booking:", err);
      }
    };

    fetchBooking();
  }, [userId]);

  if (!userToken || !userId) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="bg-black/40 p-6 rounded w-full max-w-4xl flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome to Car Rent Booking
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <Link
            to="/user/Carspage"
            className="bg-blue-600 text-white py-3 rounded text-center"
          >
            Book Car
          </Link>
          <Link
            to={`/user/UserReadbooking/${userId}`}
            className="bg-green-600 text-white py-3 rounded text-center"
          >
            Your Booking Info
          </Link>
          {booking && (
            <Link to={`/user/UserGetpayment/${userId}`}>
                Your Payment Info
              </Link>

          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
