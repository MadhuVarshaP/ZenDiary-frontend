import React, { useEffect, useState } from "react";
import profile from "../assets/user.jpg"; // Default image
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // User data from backend
  const [profilePicture, setProfilePicture] = useState(profile); // Profile picture
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You need to be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;
        setUser(user);
        if (user.profilePicture) {
          setProfilePicture(user.profilePicture);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePictureChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You need to log in to update your profile.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/update-profile",
        { profilePicture: newProfilePicture || profilePicture },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update profile picture locally
      setProfilePicture(newProfilePicture);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-[25px] bg-beige min-h-screen p-3 text-black">
      <p className="text-3xl font-bold text-center">Profile</p>
      <div className="profile-container flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center relative">
          <img
            src={newProfilePicture || profilePicture || profile}
            alt="Profile"
            className="w-[150px] h-[150px] rounded-full border-4 border-gray-200 object-cover"
          />
          <div
            className="flex space-x-2 items-center py-[10px] cursor-pointer"
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            <FaPenToSquare />
            <p>Change profile picture</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 opacity-0 cursor-pointer"
            onChange={handleProfilePictureChange}
          />
          <h2 className="text-xl mt-2">Name: {user.username}</h2>
          <p className="text-xl">Email: {user.email}</p>
        </div>

        <button
                className="px-8 bg-black text-white rounded-lg py-2 mt-4"
                onClick={handleUpdateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
