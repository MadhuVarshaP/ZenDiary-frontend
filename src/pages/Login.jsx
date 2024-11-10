import React from "react";
import registerImage from "../assets/register.webp";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 bg-lightbrown p-10">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-5xl font-bold text-black">Hi there!</h1>
          <p className="text-lg text-black">
            Welcome to Haze. Community Dashboard
          </p>

          <label className="input input-bordered flex items-center gap-2 text-green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className="grow" placeholder="Email" />
          </label>

          <label className="input input-bordered flex items-center gap-2 text-green">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="password" className="grow" value="password" />
          </label>
          <div className="flex justify-center">
            <button className="px-8 bg-black text-white rounded-lg py-2 mt-4 ">
              Log In
            </button>
          </div>
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

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

export default Login;
