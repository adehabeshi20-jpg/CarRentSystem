  import { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

import Booking from "./Booking";
import BookingDelete from "./BookingDelete";
import BookingUpdate from "./BookingUpdate";
import Cars from "./Cars";
import DashboardAdmin from "./DashboardAdmin";
import GetAdmins from "./GetAdmins";
import Getdata from "./Getdata";
import Getdatabookin from "./Getdatabookin";
import GetPayment from "./GetPayment";
import GetUser from "./GetUser";
import Payment from "./Payment";
import Readbooking from "./Readbooking";
import UserById from "./User/UserById";
import UserUpdate from "./Userupdate";

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) navigate("/admin/login"); 
  }, [navigate, token]);

  if (!token) return null; 

  return (
    <div className="flex min-h-screen">
      <div className="w-60 mt-25 mb-2 bg-gray-800 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Menu</h2>
          <Link to="/admin" className="mb-4 text-center hover:text-gray-300 bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Dashboard</Link>
          <Link to="/admin/GetAdmins" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md ">Admins Page</Link>        
          <Link to="/admin/GetUser" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Users Page</Link>
          <Link to="/admin/Cars" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Add Car</Link>
          <Link to="/admin/Booking" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Add Booking</Link>
          <Link to="/admin/Getdatabookin" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Get Booking Data</Link>
          <Link to="/admin/Getdata" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Get Data</Link>
          <Link to="/admin/Payment" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Payment</Link>
          <Link to="/admin/GetPayment" className="mb-4 hover:text-gray-300 text-center bg-gradient-to-r from-green-500 to-blue-600
                          hover:from-blue-600 hover:to-green-500
                          transition-all duration-300 active:scale-95 shadow-md">Get Payment</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <Routes>
          <Route index element={<DashboardAdmin />} />
          <Route path="GetAdmins" element={<GetAdmins />} />
          <Route path="GetUser" element={<GetUser />} />
          <Route path="Cars" element={<Cars />} />
          <Route path="Booking" element={<Booking />} />
          <Route path="Getdatabookin" element={<Getdatabookin />} />
          <Route path="Getdatabookin/updatebookingal/:id" element={<BookingUpdate />} />
          <Route path="Getdata" element={<Getdata />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="GetPayment" element={<GetPayment />} />
          <Route path="user/view/:id" element={<UserById />} />
          <Route path="userupdate/:id" element={<UserUpdate />} />
          <Route path="read_booking/:id" element={<Readbooking />} />
          <Route path="BookingDelete/:id" element={<BookingDelete />} />
        </Routes>
      </div>
    </div>
  );
};


export default AdminLayout;
