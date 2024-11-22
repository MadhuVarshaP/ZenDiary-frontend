import React, { useState } from "react";
import registerImage from "../assets/register.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before submission
  
    try {
      const response = await axios.post("https://zendiary-backend.vercel.app/api/auth/register", {
        email,
        username,
        password,
      });
  
      // Store token
      localStorage.setItem("authToken", response.data.token);
  
      // On successful registration, redirect to login
      if (response.status === 200 || response.status === 201) {
        navigate("/login"); // Navigate to login page
      }
    } catch (err) {
      // Set error message if any error occurs
      setError(err.response?.data?.message || "An error occurred!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex h-[90vh]">
      {/* Left Side - Registration Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-lightbrown p-10">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-5xl font-bold text-black">Hi there!</h1>
          <p className="text-lg text-black">Welcome to ZenDiary!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered flex items-center gap-2 text-green">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 text-green">
              <input
                type="text"
                className="grow"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 text-green">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 bg-black text-white rounded-lg py-2 mt-4"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 h-full">
        <img
          src={registerImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
