import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Admin Panel</h1>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Admin Login
      </button>
    </div>
  );
};

export default LandingPage;
