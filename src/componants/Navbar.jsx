import React, { useState, useRef, useEffect } from "react";
import { Bell, UserCircle, Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-slate-800">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">
        {/* Notification */}
        <button className="relative">
          <Bell className="text-slate-600 cursor-pointer hover:text-blue-600 transition" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-lg transition"
          >
            <UserCircle className="text-slate-600" size={34} />

            <div className="text-left">
              <p className="font-medium text-slate-700">Admin</p>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-50">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
                onClick={() => navigate("/profile")}
              >
                <User size={18} />
                My Profile
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
                onClick={() => navigate("/settings")}
              >
                <Settings size={18} />
                Settings
              </button>

              <hr />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
