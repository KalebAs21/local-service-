import React, { useState } from "react";
import { Plus, Calendar, MessageCircle, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
 

const ProviderDashboard = ({ setShowProfile }) => {
  const [showDropdown, setShowDropdown] = useState(false);
   // 👈 for hover dropdown
   const { token, setToken } = useContext(StoreContext);
   const navigate = useNavigate();
   const logOut = () =>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }

  const recentReviews = [
    {
      name: "Jennifer Liu",
      service: "House Cleaning",
      review: "Sarah did an amazing job! My apartment has never looked better.",
      time: "2 days ago",
    },
    {
      name: "Michael Brown",
      service: "Deep Cleaning",
      review: "Excellent service! Very professional and thorough.",
      time: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-color-background text-color-foreground p-6 md:p-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 relative">
        <div>
          <h1 className="text-2xl font-bold">Provider Dashboard</h1>
          <p className="text-sm opacity-75">Welcome back, Sarah Johnson</p>
        </div>

        <div className="flex gap-3 relative">
          {/* Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-2 border border-color-border px-4 py-2 rounded-md hover:bg-color-card transition">
              <User size={16} /> Profile
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-color-card border border-color-border rounded-md shadow-lg text-left z-10">
                <button
                  onClick={() => setShowProfile(true)}
                  className="block w-full text-left px-4 py-2 hover:bg-color-background transition"
                >
                  Profile Settings
                </button>
                <button onClick={logOut} className="block w-full text-left px-4 py-2 hover:bg-color-background transition text-red-500 flex items-center gap-2">
                  <LogOut  size={14} /> Logout
                </button>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 bg-color-primary text-color-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition">
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Earnings", value: "$2840" },
          { title: "This Month", value: "$680" },
          { title: "Active Bookings", value: "5" },
          { title: "Completed Jobs", value: "127" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-color-card rounded-lg p-4 shadow card-hover"
          >
            <p className="text-sm opacity-70">{stat.title}</p>
            <h2 className="text-2xl font-semibold">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Performance Metrics & Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance */}
          <div className="bg-color-card p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              {[
                { label: "Average Rating", value: "4.9/5.0", width: "98%" },
                { label: "Response Rate", value: "95%", width: "95%" },
              ].map((metric, i) => (
                <div key={i}>
                  <p className="text-sm mb-1">
                    {metric.label}{" "}
                    <span className="font-semibold">{metric.value}</span>
                  </p>
                  <div className="w-full bg-color-border rounded-full h-2">
                    <div
                      className="bg-color-primary h-2 rounded-full"
                      style={{ width: metric.width }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-color-card p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Recent Reviews</h3>
            {recentReviews.map((r, i) => (
              <div
                key={i}
                className="mb-4 pb-4 border-b last:border-b-0 border-color-border"
              >
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm opacity-75">{r.service}</p>
                <p className="text-sm mt-1">{r.review}</p>
                <p className="text-xs opacity-60 mt-1">{r.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-color-card p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 bg-color-primary text-color-primary-foreground px-4 py-2 rounded-md">
                <Plus size={16} /> Add New Service
              </button>
              <button className="flex items-center gap-2 border border-color-border px-4 py-2 rounded-md">
                <Calendar size={16} /> Manage Schedule
              </button>
              <button className="flex items-center gap-2 border border-color-border px-4 py-2 rounded-md">
                <MessageCircle size={16} /> Message Center
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 border border-color-border px-4 py-2 rounded-md"
              >
                <User size={16} /> Profile Settings
              </button>
            </div>
          </div>

          <div className="bg-color-card p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-3">Tips for Success</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>
                Respond to booking requests within 2 hours for better visibility
              </li>
              <li>Add photos to your services to attract more customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
