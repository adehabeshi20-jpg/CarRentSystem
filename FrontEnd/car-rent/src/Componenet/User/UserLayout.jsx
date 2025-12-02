import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Carspage from "../Carspage";
import UserById from "./UserById";
import UserGetpayments from "./UserGetpayments";
import UserReadbooking from "./UserReadbooking";
import Userbookingid from "./Userbookingid";
import UserDasborad from "./UserDasborad";
import Userupdatebyid from "./Userupdatebyid";
import Userpayment from "./Userpayment";

const UserLayout = () => {
const navigate = useNavigate();
const location = useLocation();
const userToken = localStorage.getItem("userToken");
const userId = localStorage.getItem("userId");

useEffect(() => {
if (!userToken || !userId) navigate("/login");
}, [navigate, userToken, userId]);

if (!userToken || !userId) return null;

const isActive = (path) => location.pathname === path;

return ( <div className="flex min-h-screen">
{/* Sidebar */} <div className="w-60 bg-gray-800 text-white flex flex-col p-6"> <h2 className="text-2xl font-bold mb-8">Customer Menu</h2>

    <Link to="/user" className={`mb-4 text-center menu-btn ${isActive("/user") ? "bg-gray-700 rounded" : ""}`}>Dashboard</Link>
    <Link to="/user/Carspage" className={`mb-4 text-center menu-btn ${isActive("/user/Carspage") ? "bg-gray-700 rounded" : ""}`}>Book Car</Link>
    <Link to={`/user/UserReadbooking/${userId}`} className={`mb-4 text-center menu-btn ${isActive(`/user/UserReadbooking/${userId}`) ? "bg-gray-700 rounded" : ""}`}>Your Bookings</Link>
    <Link to={`/user/UserGetpayments/${userId}`} className={`mb-4 text-center menu-btn ${isActive(`/user/UserGetpayments/${userId}`) ? "bg-gray-700 rounded" : ""}`}>Your Payments</Link>
    <Link to={`/user/update/${userId}`} className={`mb-4 text-center menu-btn ${isActive(`/user/update/${userId}`) ? "bg-gray-700 rounded" : ""}`}>Update Profile</Link>
  </div>

  {/* Main Content */}
  <div className="flex-1 bg-gray-100 p-8">
    <Routes>
      <Route index element={<UserDasborad />} />
      <Route path="user/:id" element={<UserById />} />
      <Route path="Carspage" element={<Carspage />} />
      <Route path="Booking/:id" element={<Userbookingid />} />
      <Route path="UserReadbooking/:id" element={<UserReadbooking />} />
      <Route path="update/:id" element={<Userupdatebyid />} />
      <Route path="UserGetpayments/:id" element={<UserGetpayments />} />
      <Route path="payment/:bookingId" element={<Userpayment />} />
    </Routes>
  </div>
</div>

);
};


export default UserLayout;

