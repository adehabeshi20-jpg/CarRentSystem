
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "../LoginValidation";

const Userupdatebyid = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");
  const userId = localStorage.getItem("userId");

  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userToken) navigate("/login");
  }, [userToken, navigate]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:2530/user/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          const { Fname, Lname, email, phone } = res.data.user;
          setValues({ Fname, Lname, email, phone, password: "" });
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching user:", err);
          setLoading(false);
        });
    }
  }, [userId, userToken]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedData = { ...values };
      if (!updatedData.password) delete updatedData.password;

      axios
        .put(`http://localhost:2530/userupdate/${userId}`, updatedData, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          const { Fname, Lname, email, phone } = res.data.user;
          setValues({ Fname, Lname, email, phone, password: "" });
          alert("Profile updated successfully!");
          navigate("/user");
        })
        .catch((err) => {
          console.log("Update error:", err);
          alert("Failed to update profile. Try again.");
        });
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-cyan-600 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-100">
          Update Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["Fname", "Lname", "email", "password", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="text-white mb-1 font-semibold">
                {field}:
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={values[field] || ""}
                onChange={handleInput}
                placeholder={`Enter ${field}`}
                className="w-full p-2 rounded border border-gray-300 text-black"
              />
              {errors[field] && (
                <span className="text-red-400 text-sm">{errors[field]}</span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Userupdatebyid;
