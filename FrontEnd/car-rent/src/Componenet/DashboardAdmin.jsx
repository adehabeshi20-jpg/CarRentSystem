import React from 'react';
import { Link } from 'react-router-dom';
import bgimg from "../assets/Image/Electric Cars.jpg";

const DashboardAdmin = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="bg-black/30 min-h-screen p-8 text-center">
        <h1 className="text-3xl mb-8 text-center font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          WELCOME TO ADMIN DASHBOARD
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/admin/cars"
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-4 rounded-lg shadow hover:from-blue-600 hover:to-cyan-500 transition-all"
            >
              Add Car
            </Link>
            <Link
              to="/admin/Getdatabookin"
              className="bg-gradient-to-r from-green-400 to-lime-400 text-white py-4 rounded-lg shadow hover:from-green-500 hover:to-lime-500 transition-all"
            >
              Get Booking Data
            </Link>
            <Link
              to="/admin/GetPayment"
              className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white py-4 rounded-lg shadow hover:from-yellow-500 hover:to-amber-500 transition-all"
            >
              Payment Data
            </Link>
          </div>


                </div>
              </div>
            );
          };

export default DashboardAdmin;
