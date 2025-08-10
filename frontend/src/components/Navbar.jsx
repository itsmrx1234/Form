import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { username, setUsername, loggedIn, setLoggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername("");
    setLoggedIn(false);
    logOut()
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="logo"
            className="h-10 w-10 animate-spin-slow"
          />
          <h1 className="text-white text-2xl font-bold tracking-wide">IdkBroo</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold underline"
                : "text-white font-semibold hover:underline transition duration-300"
            }
          >
            Home
          </NavLink>

          {!loggedIn ? (
            <NavLink
              to="/login"
              className="text-white font-semibold hover:underline transition duration-300"
            >
              Login
            </NavLink>
          ) : (
            <>
              <span className="text-white font-semibold mr-4">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="text-white font-semibold hover:underline transition duration-300 cursor-pointer bg-red-600 px-3 py-1 rounded"
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
