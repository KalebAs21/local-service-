// src/components/Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setApplications(data.applications);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      alert(`Application ${status}`);
      fetchApplications(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-6">Applications</h2>

        {applications.length === 0 ? (
          <p className="text-gray-600">No applications found.</p>
        ) : (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white shadow p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{app.fullName}</h3>
                  <p className="text-sm text-gray-600">📧 {app.userId?.email}</p>
                  <p className="text-sm text-gray-600">📞 {app.phone}</p>
                  <p className="text-sm text-gray-600">💼 {app.skills.join(", ")}</p>
                  <p
                    className={`text-sm mt-1 font-medium ${
                      app.status === "approved"
                        ? "text-green-600"
                        : app.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {app.status}
                  </p>
                </div>

                {app.status === "pending" && (
                  <div className="mt-3 sm:mt-0 flex gap-2">
                    <button
                      onClick={() => handleStatusChange(app._id, "approved")}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(app._id, "rejected")}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
