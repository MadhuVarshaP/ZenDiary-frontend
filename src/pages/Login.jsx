import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import loginImage from "../assets/register.webp"
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://zendiary-backend.vercel.app/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem('authToken', response.data.token); // Store token
      
      if (response.status === 200) {
        login(response.data.user); // Set logged-in state
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[90vh]">
      {/* Left Side - Image */}
      <div className="w-1/2 h-full">
        <img
          src={loginImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-lightbrown p-10">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-5xl font-bold text-black">Welcome Back!</h1>
          <p className="text-lg text-black">Log in to your account</p>

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
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default Login;
