import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import Sidebar from "./components/Sidebar";
import Applications from "./pages/Applications";

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/applications" element={<Applications />} />
              <Route path="/" element={<Applications />} /> {/* default to applications */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
