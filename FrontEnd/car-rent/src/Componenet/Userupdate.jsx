import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import validation from "./Signuplogin/LoginValidation";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:2530/user/${id}`)
      .then(res => setValues(res.data.user))
      .catch(err => console.log("Error fetching user:", err));
  }, [id]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .put(`http://localhost:2530/userupdate/${id}`, values)
        .then(res => {
          console.log(res)
          alert("User updated successfully!");
          navigate("/admin/GetUser");
        })
        .catch(err => console.log("Update error:", err));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-cyan-600 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-100">
          Update User Info
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["Fname", "Lname", "email", "password", "phone"].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="text-white mb-1 font-semibold">{field}:</label>
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

          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            Update
          </button>

          <Link to="/admin/GetUser" className="block text-center mt-2 text-sm underline text-white">
            Back to Users
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
