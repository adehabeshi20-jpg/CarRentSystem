import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validation from "./SignupValidation";

const AdminSignup = () => {
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        return alert("You must be logged in as admin to register a new admin");
      }

      axios
        .post("http://localhost:2530/admin/register", values, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setMessage(res.data.message || "Admin registered successfully");
          setTimeout(() => navigate("/admin/"), 1500);
        })
        .catch((err) => {
          setMessage(
            err.response?.data?.error || err.response?.data?.message || "Server error"
          );
        });
    }
  };

  return (
    <div className="flex items-center  justify-center text-white h-screen bg-gray-800 ">
      <div className="  mt-0  bg-gradient-to-r from-blue-500 via-black-500 to-violet-700 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register New Admin</h1>
        {message && <p className="text-yellow-400 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4  text-white mb-0">
          {["Fname", "Lname", "email", "password", "phone"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field}:</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={values[field]}
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300"
                placeholder={`Enter ${field}`}
              />
              {errors[field] && (
                <span className="text-red-500 text-sm">{errors[field]}</span>
              )}
            </div>
          ))}

          <button className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition">
            Register
          </button>

          <p className="text-white text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/admin/login" className="underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
