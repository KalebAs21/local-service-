import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/" className={`p-2 rounded ${location.pathname === "/" ? "bg-blue-600" : "hover:bg-gray-800"}`}>Dashboard</Link>
        <Link to="/applications" className={`p-2 rounded ${location.pathname === "/applications" ? "bg-blue-600" : "hover:bg-gray-800"}`}>Applications</Link>
        <Link to="/services" className={`p-2 rounded ${location.pathname === "/services" ? "bg-blue-600" : "hover:bg-gray-800"}`}>Services</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
