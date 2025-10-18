import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const url = "http://localhost:5000"; // change to your API base

  useEffect(() => {
    if (token) localStorage.setItem("adminToken", token);
    else localStorage.removeItem("adminToken");
  }, [token]);

  return (
    <AdminContext.Provider value={{ url, token, setToken }}>
      {children}
    </AdminContext.Provider>
  );
};
