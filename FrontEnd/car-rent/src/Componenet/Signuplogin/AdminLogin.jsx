import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "./LoginValidation";

const AdminLogin = () => {
  const [values, setValues] = useState({ email: "", password: "" });
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
      axios
        .post("http://localhost:2530/admin/login", values)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("adminToken", res.data.token);

            const adminData = {
              Fname: res.data.admin?.Fname || values.email.split("@")[0],
              email: values.email,
              role: "admin",
            };
            localStorage.setItem("admin", JSON.stringify(adminData)); // key matches Navbar

            setMessage("Login successful!");
            navigate("/admin/"); // Redirect to dashboard
          } else {
            setMessage("Invalid credentials");
          }
        })
        .catch((err) => {
          setMessage(err.response?.data?.message || "Server error");
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 text-white">
      <div className="bg-gradient-to-r from-blue-500 via-black to-violet-700 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        {message && <p className="text-yellow-400 text-center mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {["email", "password"].map((field) => (
            <div key={field}>
              <label className="block mb-1 capitalize">{field}:</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={values[field]}
                onChange={handleInput}
                className="w-full p-2 rounded border border-gray-300 text-black"
                placeholder={`Enter your ${field}`}
              />
              {errors[field] && (
                <span className="text-red-500 text-sm">{errors[field]}</span>
              )}
            </div>
          ))}
          <button className="w-full bg-green-500 py-2 rounded hover:bg-green-600 transition">
            Log In
          </button>
          <p className="text-white text-center text-sm mt-2">
            Don't have an account?{" "}
            <a href="/admin/signup" className="underline">
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
