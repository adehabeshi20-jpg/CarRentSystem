// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* ---------- Clerk ---------- */
import { SignIn } from "@clerk/clerk-react";

const USE_CUSTOM_BACKEND = true; // Set false to hide custom login

const Login = () => {
  /* ---------- Custom backend state ---------- */
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!values.email) newErrors.email = "Email is required";
    if (!values.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:2530/users/Login", values);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-cyan-700 mb-8 text-center">
        WELCOME BACK TO CAR RENT
      </h1>

      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 md:gap-0">
        {/* === LEFT: Custom Login === */}
        {USE_CUSTOM_BACKEND && (
          <div className="flex-1 bg-cyan-600 p-8 rounded-xl shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
              Login (Our System)
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {["email", "password"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={`custom-${field}`}
                    className="block text-white mb-1 font-medium"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>

                  <input
                    type={field === "password" ? "password" : "email"}
                    id={`custom-${field}`}
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={values[field]}
                    onChange={handleInput}
                    className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                    aria-invalid={!!errors[field]}
                    aria-describedby={errors[field] ? `error-${field}` : undefined}
                  />
                  {errors[field] && (
                    <p id={`error-${field}`} className="text-red-300 text-sm mt-1">
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded font-semibold transition-all ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <Link
                to="/signup"
                className="block w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 text-white font-medium transition"
              >
                Don't have an account? Sign Up
              </Link>
            </form>
          </div>
        )}

        {/* === RIGHT: Clerk Sign-In === */}
        <div className="flex-1 bg-white p-8 rounded-xl shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-cyan-600 mb-6 text-center md:text-left">
            Login with Clerk
          </h2>

          <div className="max-w-sm mx-auto w-full">
            <SignIn
              path="/login"
              routing="path"
              signUpUrl="/signup"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-black text-white hover:bg-gray-800 w-full py-3 rounded font-semibold transition-all",
                  formFieldInput:
                    "w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500",
                  formFieldLabel: "text-gray-700 mb-1 font-medium",
                  footerActionLink: "text-cyan-600 hover:underline",
                },
              }}
            />
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-600 hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;