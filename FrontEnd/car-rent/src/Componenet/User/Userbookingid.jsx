import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const UserReadbooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) return navigate("/login");

    let userId;
    try {
      userId = jwtDecode(token).id;
    } catch {
      return navigate("/login");
    }

    const load = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2530/booking/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(res.data.bookings || []);
      } catch (err) {
        alert("Failed to fetch bookings",err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:2530/booking/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const startEdit = (b) => {
    setEditId(b.id);
    setEditValues({
      start_date: b.start_date?.split("T")[0] || "",
      end_date: b.end_date?.split("T")[0] || "",
      status: b.status,
    });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(
        `http://localhost:2530/updatebookingal/${id}`,
        editValues
      );
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...editValues } : b))
      );
      setEditId(null);
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-4 shadow rounded">
          {editId === b.id ? (
            <>
              <input type="date" name="start_date" value={editValues.start_date}
                onChange={(e) => setEditValues({ ...editValues, start_date: e.target.value })} />
              <input type="date" name="end_date" value={editValues.end_date}
                onChange={(e) => setEditValues({ ...editValues, end_date: e.target.value })} />

              <select name="status" value={editValues.status}
                onChange={(e) => setEditValues({ ...editValues, status: e.target.value })}>
                <option value="booked">Booked</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button onClick={() => saveEdit(b.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p><b>ID:</b> {b.id}</p>
              <p><b>Car:</b> {b.carName}</p>
              <p><b>Start:</b> {new Date(b.start_date).toLocaleDateString()}</p>
              <p><b>End:</b> {b.end_date ? new Date(b.end_date).toLocaleDateString() : "N/A"}</p>
              <p><b>Status:</b> {b.status}</p>

              <button onClick={() => startEdit(b)}>Edit</button>
              <button onClick={() => handleDelete(b.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserReadbooking;
