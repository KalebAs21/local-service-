// src/pages/Applications.jsx
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";

const Applications = () => {
  const { url, token } = useContext(AdminContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleUpdate = async (id, status) => {
    try {
      setMessage("");
      const res = await axios.patch(
        `${url}/api/admin/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || `Application ${status}`);
      await fetchApplications();
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="p-8 flex-1">
      <h1 className="text-2xl font-semibold mb-6">Provider Applications</h1>

      {message && <div className="mb-4 p-2 bg-blue-50 text-blue-700 rounded">{message}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : applications.length === 0 ? (
        <div>No applications found.</div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-4 rounded shadow">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Full Name</div>
                  <div className="font-medium">{app.fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{app.userId?.email || "—"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>{app.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Experience</div>
                  <div>{app.experienceYears} yrs</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Skills</div>
                  <div>{(app.skills || []).join(", ")}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded text-sm font-medium ${
                    app.status === "approved" ? "bg-green-100 text-green-700" :
                    app.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {app.status}
                  </div>

                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdate(app._id, "approved")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdate(app._id, "rejected")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applications;
