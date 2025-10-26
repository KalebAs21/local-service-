import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const Applications = () => {
  const { url, token } = useContext(StoreContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data.success) {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        alert("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, [url, token]);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `${url}/api/admin/applications/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setApplications(prev =>
          prev.map(app => 
            app._id === id ? { ...app, status: response.data.application.status } : app
          )
        );
        alert(`Application ${status} successfully`);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update application status");
    }
  };

  if (loading) {
    return <div className="text-center">Loading applications...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Applications ({applications.length})
      </h2>
      
      {applications.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No applications found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 border border-gray-300 dark:border-gray-600 text-left">Name</th>
                <th className="p-3 border border-gray-300 dark:border-gray-600 text-left">Email</th>
                <th className="p-3 border border-gray-300 dark:border-gray-600 text-left">Status</th>
                <th className="p-3 border border-gray-300 dark:border-gray-600 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {app.userId?.name || 'N/A'}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    {app.userId?.email || 'N/A'}
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600 space-x-2">
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(app._id, "approved")}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {app.status !== "pending" && (
                      <span className="text-gray-500 text-sm">No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Applications;