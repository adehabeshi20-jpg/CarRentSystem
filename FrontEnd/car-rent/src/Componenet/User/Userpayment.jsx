import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UserPayment = () => {
const { bookingId } = useParams();
const navigate = useNavigate();
const location = useLocation();

const [booking, setBooking] = useState(location.state?.booking || null);
const [paymentMethod, setPaymentMethod] = useState("Credit Card");
const [amount, setAmount] = useState(booking?.price || 0);
const [loading, setLoading] = useState(!booking);
const [submitting, setSubmitting] = useState(false);
const [decodedUserId, setDecodedUserId] = useState(null);

useEffect(() => {
const token = localStorage.getItem("userToken");
if (!token) return navigate("/login");


try {
  const decoded = jwtDecode(token);
  setDecodedUserId(decoded.id);
} catch (err) {
  console.error("Invalid token:", err);
  navigate("/login");
}


}, [navigate]);

useEffect(() => {
if (booking) {
setAmount(booking.price || 0);
setLoading(false);
return;
}


const loadBooking = async () => {
  try {
    const res = await axios.get(`http://localhost:2530/booking/${bookingId}`);
    if (!res.data?.booking) throw new Error("Booking not found");
    setBooking(res.data.booking);
    setAmount(res.data.booking.price || 0);
  } catch (err) {
    console.error("Failed to load booking:", err);
    alert("Failed to load booking");
  } finally {
    setLoading(false);
  }
};

loadBooking();


}, [booking, bookingId]);

const handlePayment = async (e) => {
e.preventDefault();
if (!booking) return;


if (!amount || Number(amount) <= 0) {
  alert("Amount must be greater than 0");
  return;
}

setSubmitting(true);
try {
  const paymentData = {
    booking_id: booking.id,
    amount: Number(amount),
    payment_method: paymentMethod,
    status: "paid",
    paid_at: new Date(),
    userId: decodedUserId,
  };
  await axios.post("http://localhost:2530/payments", paymentData);

  await axios.put(`http://localhost:2530/updatebookingal/${booking.id}`, {
    paymentStatus: "paid",
  });

  alert("Payment successful!");

  navigate("/user/UserReadbooking", {
    state: {
      updatedBooking: {
        id: booking.id,
        paymentStatus: "paid",
        payment_method: paymentMethod,
        paid_at: paymentData.paid_at,
      },
    },
  });
} catch (err) {
  console.error("Payment failed:", err.response?.data || err.message || err);
  alert("Payment failed. Check console for details.");
} finally {
  setSubmitting(false);
}


};

if (loading) return <p className="text-center mt-10">Loading booking...</p>;
if (!booking) return <p className="text-center mt-10">Booking not found.</p>;

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100"> <form
     onSubmit={handlePayment}
     className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-lg text-white"
   > <h2 className="text-2xl font-semibold mb-6 text-center">
Payment for {booking.carName} </h2>


    <div className="mb-4">
      <label className="block mb-1">Booking ID</label>
      <input
        type="text"
        value={booking.id}
        disabled
        className="w-full p-2 rounded-md bg-amber-950 text-white"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-1">Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="w-full p-2 rounded-md bg-amber-950 text-black"
      />
    </div>

    <div className="mb-4">
      <label className="block mb-1">Payment Method</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full p-2 rounded-md bg-amber-950 text-black"
      >
        <option value="Credit Card">Credit Card</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>
    </div>

    <div className="flex gap-4 mt-4">
      <button
        type="submit"
        disabled={submitting}
        className="flex-1 bg-green-600 py-2 rounded-lg hover:bg-green-700 transition"
      >
        {submitting ? "Processing..." : "Pay Now"}
      </button>
      <button
        type="button"
        onClick={() => navigate("/user/UserReadbooking")}
        className="flex-1 bg-gray-600 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Back to Bookings
      </button>
    </div>
  </form>
</div>


);
};

export default UserPayment;
