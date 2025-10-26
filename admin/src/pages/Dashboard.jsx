import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const Dashboard = () => {
  const { url, token } = useContext(StoreContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApplications: 0,
    activeServices: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // You'll need to create these endpoints in your backend
        const [usersRes, appsRes, servicesRes] = await Promise.all([
          axios.get(`${url}/api/admin/users/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${url}/api/admin/applications`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${url}/api/admin/services`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        const pendingApps = appsRes.data.applications?.filter(app => app.status === 'pending') || [];
        
        setStats({
          totalUsers: usersRes.data.totalUsers || 0,
          pendingApplications: pendingApps.length,
          activeServices: servicesRes.data.services?.length || 0
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [url, token]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Users</h3>
          <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pending Applications</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Services</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeServices}</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.href = '/applications'}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            Manage Applications
          </button>
          <button 
            onClick={() => window.location.href = '/services'}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Manage Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;