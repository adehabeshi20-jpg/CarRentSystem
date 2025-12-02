import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import carimage from "../assets/Image/Electric Cars.jpg";

const BookingUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    user_id: "",
    car_id: "",
    start_date: "",
    end_date: "",
    status: "booked",
  });

  useEffect(() => {
    if (!id) {
      alert("Booking ID not provided!");
      navigate("/admin/Getdatabookin");
      return;
    }

    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:2530/booking/${id}`);
        const booking = res.data?.booking;

        if (booking) {
          setValues({
            user_id: booking.user_id || "",
            car_id: booking.car_id || "",
            start_date: booking.start_date?.split("T")[0] || "",
            end_date: booking.end_date?.split("T")[0] || "",
            status: booking.status || "booked",
          });
        } else {
          alert("Booking not found");
          navigate("/admin/Getdatabookin");
        }
      } catch (err) {
        console.error("Failed to fetch booking:", err);
        alert("Error fetching booking");
        navigate("/admin/Getdatabookin");
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:2530/updatebookingal/${id}`, values, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Booking updated successfully!");
      navigate("/admin/Getdatabookin");
    } catch (err) {
      console.error("Booking update failed:", err);
      alert("Booking update failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${carimage})` }}
    >
      <div className="bg-black/20 p-8 rounded-lg w-full max-w-5xl text-white backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-6 text-center">Update Booking</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-white">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">User ID:</label>
            <input
              type="text"
              name="user_id"
              value={values.user_id}
              onChange={handleChange}
              className="p-2 rounded text-red-900 bg-cyan-300"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Car ID:</label>
            <input
              type="text"
              name="car_id"
              value={values.car_id}
              onChange={handleChange}
              className="p-2 rounded text-red-900 bg-cyan-300"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Start Date:</label>
            <input
              type="DATE"
              name="start_date"
              value={values.start_date}
              onChange={handleChange}
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">End Date:</label>
            <input
              type="DATE"
              name="end_date"
              value={values.end_date}
              onChange={handleChange}
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Status:</label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className={`p-2 rounded text-black ${
                values.status === "booked" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="w-96 flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 
                        hover:from-pink-500 hover:to-yellow-500 py-2 rounded font-bold transition-all duration-300"
            >
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingUpdate;
