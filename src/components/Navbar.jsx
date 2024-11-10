import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 shadow-xl border-b border-lightbrown">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-black">
          <span className="text-green">Zen</span>
          <span className="text-pink">Diary</span>
        </Link>

        <div className="flex space-x-6">
          <Link to="/dashboard">
            <button className="text-black hover:text-pink transition duration-300 text-lg ">
              Dashboard
            </button>
          </Link>
          <Link to="/about">
            <button className="text-black hover:text-pink transition duration-300 text-lg ">
              About
            </button>
          </Link>
          <Link to="/profile">
            <button className="text-black hover:text-pink transition duration-300 text-lg ">
              Profile
            </button>
          </Link>
        </div>

        <div>
          <Link to="/login">
            <button className="bg-beige btn btn-outline hover:bg-pink text-black mr-4 rounded-full px-6 py-2 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-beige btn btn-outline hover:bg-pink text-black rounded-full px-6 py-2 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
