import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate inside a <Router> context

  return (
    <nav className="relative p-4 shadow-xl border-b border-lightbrown h-[10vh]">
      <div className="max-w-7xl mx-auto flex justify-center items-center w-full">
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-semibold text-black mb-4 md:mb-0">
          <span className="text-green">Zen</span>
          <span className="text-pink">Diary</span>
        </Link>

        {/* Navigation Links Section */}
        {isLoggedIn &&
          <div className="flex justify-center items-center space-x-5 mb-4 md:mb-0">
            <Link to="/dashboard">
              <button className="text-black hover:text-pink transition duration-300 text-lg">
                Dashboard
              </button>
            </Link>
            <Link to="/profile">
              <button className="text-black hover:text-pink transition duration-300 text-lg">
                Profile
              </button>
            </Link>
          </div>}

        {/* Right-aligned Logout or Login/Register */}
        <div className="flex justify-end w-full">
          {isLoggedIn
            ? <button
                onClick={() => logout(navigate)} // Pass navigate to logout
                className="bg-beige btn btn-outline hover:bg-pink text-black rounded-full px-6 py-2 transition duration-300"
              >
                Logout
              </button>
            : <div className="flex space-x-4">
                <Link to="/login">
                  <button className="bg-beige btn btn-outline hover:bg-pink text-black rounded-full px-6 py-2 transition duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-beige btn btn-outline hover:bg-pink text-black rounded-full px-6 py-2 transition duration-300">
                    Register
                  </button>
                </Link>
              </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
