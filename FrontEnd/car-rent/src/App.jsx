import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Componenet/Footer";
import Navbar from "./Componenet/page/Navbar";

// User Components
import Login from "./Componenet/Signuplogin/Login";
import Signup from "./Componenet/Signuplogin/Signup";
import UserLayout from "./Componenet/User/UserLayout";

// Admin Components
import AdminLayout from "./Componenet/AdminLayout";
import AdminLogin from "./Componenet/Signuplogin/AdminLogin";
import AdminSignup from "./Componenet/Signuplogin/AdminSignup";

// Other pages
import Carspage from "./Componenet/Carspage";
import Display from "./Componenet/Display";
import Payment from "./Componenet/Payment";

// Protected route
import Booking from "./Componenet/Booking";
import ProtectedRoute from "./Componenet/ProtectedRoute";

const App = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} setUser={setUser} />
      <ToastContainer position="top-center" autoClose={2000} />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Display />} />
          <Route path="/cars" element={<Carspage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user/Booking/:carId" element={<Booking/>}/>


          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Display />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
