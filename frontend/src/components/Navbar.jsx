import { User, Menu, LogOut, Settings, UserCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken } = useContext(StoreContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

   const logOut = () =>{
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl cursor-pointer hover:text-primary text-glow">
              <a onClick={logOut}>LocalMarket</a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/browse"
              className="text-foreground hover:text-primary transition-smooth"
            >
              Find Services
            </a>
            <a
              href="/provider-dashboard"
              className="text-foreground hover:text-primary transition-smooth"
            >
              Become a Provider
            </a>
            <a
              href="/about"
              className="text-foreground hover:text-primary transition-smooth"
            >
              About
            </a>
            <a
              href="/help"
              className="text-foreground hover:text-primary transition-smooth"
            >
              Help
            </a>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {!token ? (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center px-4 py-2 rounded-md transition-smooth cursor-pointer hover:bg-muted"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign In
                </button>
              </>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setShowProfileMenu(true)}
                onMouseLeave={() => setShowProfileMenu(false)}
              >
                {/* Profile Button */}
                <div className="flex items-center px-4 py-2 rounded-md transition-smooth cursor-pointer hover:bg-muted">
                  <UserCircle className="mr-2 h-4 w-4" />
                  Kaleb
                </div>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-lg shadow-lg py-2 z-50 transition-all duration-200 animate-fade-in">
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm hover:bg-muted cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </a>
                    <button
                      onClick={logOut}
                      className="flex items-center px-4 py-2 text-sm hover:bg-muted w-full text-left cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <a href="/apply-provider" className="cosmic-button">Join as Provider</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md hover:bg-muted transition-smooth">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
