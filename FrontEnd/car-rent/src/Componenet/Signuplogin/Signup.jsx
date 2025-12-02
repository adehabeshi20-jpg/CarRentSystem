import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./SignupValidation";
import { SignUp } from "@clerk/clerk-react";

const USE_CUSTOM_BACKEND = true;

const Signup = () => {
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:2530/users/Register", values);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-gray-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* ===== Custom Backend Form ===== */}
        {USE_CUSTOM_BACKEND && (
          <div className="flex-1 bg-gradient-to-br from-cyan-700 to-cyan-500 p-4 rounded-lg shadow-md text-white flex flex-col justify-center max-h-[600px]">
            <h2 className="text-lg font-bold mb-2 text-center md:text-left">
              Sign Up (Our System)
            </h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              {["Fname", "Lname", "email", "password", "phone"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={`custom-${field}`} className="mb-0.5 text-xs font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    id={`custom-${field}`}
                    name={field}
                    placeholder={`Enter ${field}`}
                    value={values[field]}
                    onChange={handleInput}
                    className="w-full p-1.5 rounded-md border border-gray-300 text-gray-900 focus:outline-none focus:ring-1 focus:ring-white text-xs"
                  />
                  {errors[field] && (
                    <p className="text-red-300 text-[10px] mt-0.5">{errors[field]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-1.5 rounded-md font-semibold transition text-xs ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-white text-cyan-700 hover:bg-gray-100"
                }`}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <Link
                to="/login"
                className="block w-full text-center py-1.5 rounded-md bg-white text-cyan-700 font-medium hover:bg-gray-100 text-xs"
              >
                Already have an account? Log In
              </Link>
            </form>
          </div>
        )}

        {/* ===== Clerk Signup ===== */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md flex flex-col justify-center max-h-[250px]">
          <h2 className="text-lg font-bold text-cyan-600 mb-2 text-center md:text-left">
            Sign Up with Clerk
          </h2>
          <div className="max-w-[220px] mx-auto w-full">
            <SignUp
              path="/signup"
              routing="path"
              signInUrl="/login"
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-black text-white hover:bg-gray-800 w-full py-1.5 rounded-md font-semibold transition text-xs",
                  formFieldInput:
                    "w-full p-1.5 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-xs",
                  formFieldLabel: "text-gray-700 mb-0.5 font-medium text-xs",
                  footerActionLink: "text-cyan-600 hover:underline text-xs",
                },
              }}
            />
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
