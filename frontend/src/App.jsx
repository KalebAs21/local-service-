import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopup.jsx";
import BrowseServices from "./pages/BrowseServices.jsx";
import ProviderApplication from "./pages/ProviderApplication.jsx";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {/* LoginPopup is now inside BrowserRouter */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browseservices" element={<BrowseServices />} />
        <Route path="/apply-provider" element={<ProviderApplication />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
