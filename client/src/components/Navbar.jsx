import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiSparkles, HiArrowRightOnRectangle, HiUser } from "react-icons/hi2";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
    navigate("/");
  };

  const isLandingPage = location.pathname === "/";

  return (
    <nav className="glass border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 hover:opacity-80 transition-opacity"
          >
            <HiSparkles className="w-6 h-6 text-primary-400" />
            contentRepurp
          </Link>

          {/* Right Side - Hidden on Landing Page */}
          {!isLandingPage && (
            <div className="flex items-center gap-4">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 hover:bg-white/5 p-1.5 pr-3 rounded-full transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm text-dark-100 font-medium">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 py-2 glass rounded-xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-top-2 z-50">
                      <div className="px-4 py-2 border-b border-white/5 mb-1">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-dark-300 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-dark-100 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <HiUser className="w-4 h-4" /> Profile Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <HiArrowRightOnRectangle className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex items-center gap-2 text-sm text-dark-200 hover:text-white transition-colors"
                  >
                    <HiArrowRightOnRectangle className="w-4 h-4" />
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center bg-white text-dark-900 hover:bg-white/90 font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
