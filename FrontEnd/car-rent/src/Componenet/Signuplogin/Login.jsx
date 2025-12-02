import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidation";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post("http://localhost:2530/users/login", values);
        if (res.data.status === "success") {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userId", res.data.user.id);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          navigate("/user");
        } else {
          alert(res.data.message || "Login failed");
        }
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-cyan-700 mb-8 text-center">
        WELCOME BACK TO CAR RENT
      </h1>

      <div className="w-full max-w-5xl  flex flex-col md:flex-row sm:flex:col  gap-8 md:gap-0">
        <div className="flex-1 bg-cyan-600 p-8 rounded-xl shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-6 text-center md:text-left">
            Login (Our System)
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-white mb-1 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleInput}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="text-red-300 text-sm mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-white mb-1 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleInput}
                className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {errors.password && (
                <span id="password-error" className="text-red-300 text-sm mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 h-4 w-4" />
              <label htmlFor="remember" className="text-white text-sm">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded font-semibold hover:bg-green-600 transition"
            >
              Log In
            </button>

            <p className="text-white text-center text-sm mt-2">
              By signing in, you agree to our policy.
            </p>

            <Link
              to="/signup"
              className="block w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 text-white font-medium transition"
            >
              Create Account
            </Link>
          </form>
        </div>

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
