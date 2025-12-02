import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      // Admin route: validate with backend
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return;
      }

      axios
        .get("http://localhost:2530/admin/dashboard-data", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setIsAuth(true))
        .catch(() => {
          localStorage.removeItem("adminToken");
          setIsAuth(false);
        })
        .finally(() => setLoading(false));
    } else {
      // User route: simple local token check
      const token = localStorage.getItem("userToken");
      if (token) setIsAuth(true);
      else setIsAuth(false);
      setLoading(false);
    }
  }, [isAdmin]);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to={isAdmin ? "/admin/login" : "/login"} replace />;

  return children;
};

export default ProtectedRoute;
