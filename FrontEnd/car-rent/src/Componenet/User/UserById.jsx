import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loggedInUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) navigate("/login");

    if (id !== loggedInUserId) {
      alert("You can only view your own profile");
      navigate("/user");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:2530/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, loggedInUserId, navigate, token]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-blue-100 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>First Name:</strong> {user.Fname}</p>
          <p><strong>Last Name:</strong> {user.Lname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="mt-4 flex justify-center">
  <button
    className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500"
    onClick={() => navigate(`/user/update/${user.id}`)}
  >
    Update Profile
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default UserById;
