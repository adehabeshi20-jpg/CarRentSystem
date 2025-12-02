import axios from "axios";
import { useState, useEffect } from "react";
import carimage from "../assets/Image/Electric Cars.jpg";
import { useParams, useNavigate } from "react-router-dom";

const Booking = () => {
  const { carId } = useParams(); // get car id from URL
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [values, setValues] = useState({
    user_id: "",
    car_id: "",
    start_date: "",
    end_date: "",
    status: "booked",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    } else {
      setValues((prev) => ({
        ...prev,
        user_id: user.id, 
        car_id: carId,      
      }));
    }
  }, [user, carId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:2530/booking", values, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Booking added successfully!");
      navigate("/user/Getdatabookin"); 
    } catch (err) {
      alert("Booking failed");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${carimage})` }}
    >
      <div className="bg-black/40 p-8 rounded-lg w-full max-w-5xl text-white backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to Car Rent Booking
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-white">
          
          {/* USER ID */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">User ID</label>
            <input
              type="text"
              name="user_id"
              value={values.user_id}
              readOnly
              className="p-2 rounded bg-gray-300 text-black cursor-not-allowed"
            />
          </div>

          {/* CAR ID */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Car ID</label>
            <input
              type="text"
              name="car_id"
              value={values.car_id}
              readOnly
              className="p-2 rounded bg-gray-300 text-black cursor-not-allowed"
            />
          </div>

          {/* START DATE */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Start Date</label>
            <input
              type="date"
              name="start_date"
              onChange={handleChange}
              className="p-2 rounded text-black bg-white"
              required
            />
          </div>

          {/* END DATE */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">End Date</label>
            <input
              type="date"
              name="end_date"
              onChange={handleChange}
              className="p-2 rounded text-black bg-white"
              required
            />
          </div>

          {/* STATUS */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Status</label>
            <select
              name="status"
              onChange={handleChange}
              value={values.status}
              className="p-2 rounded text-black bg-green-400"
            >
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-96 mx-auto flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 
                hover:from-pink-500 hover:to-yellow-500 py-2 rounded font-bold transition-all duration-300"
            >
              Book Now
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Booking;
