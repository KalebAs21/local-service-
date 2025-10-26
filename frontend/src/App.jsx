import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopup.jsx";
import BrowseServices from "./pages/BrowseServices.jsx";
import ProviderApplication from "./pages/ProviderApplication.jsx";
import ProviderDashboard from "./pages/ProviderDashboard.jsx";
import ProfileSetting from "./components/ProfileSetting.jsx";

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();

  // ✅ Hide Navbar on provider dashboard
  const hideNavbar = location.pathname === "/provider-dashboard";

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showProfile && <ProfileSetting setShowProfile={setShowProfile} />}

      {/* Navbar only shows if not on provider dashboard */}
      {!hideNavbar && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browseservices" element={<BrowseServices />} />
        <Route path="/apply-provider" element={<ProviderApplication />} />
        <Route
          path="/provider-dashboard"
          element={<ProviderDashboard setShowProfile={setShowProfile} />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
