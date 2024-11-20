import React, { useState } from "react";
import axios from "axios";

const MoodSelector = ({ onMoodSelect }) => {
  const [hasSelected, setHasSelected] = useState(false);
  const [mood, setMood] = useState(null);

  const handleMoodSelection = async (selectedMood) => {
    if (hasSelected) {
      alert("You can only select your mood once per day.");
      return;
    }

    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You are not logged in. Please log in to save your mood.");
      return;
    }

    try {
      // Make the POST request to save the mood
      await axios.post(
        "http://localhost:5000/api/moods/save-mood",
        { mood: selectedMood, date: new Date().toISOString() }, // Add date
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );

      // Update local state
      setMood(selectedMood);
      setHasSelected(true);
      onMoodSelect(selectedMood);

      alert("Mood saved successfully!");
    } catch (error) {
      console.error("Error response:", error.response);
      alert("Error saving mood data: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-lavender p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black mb-4">How are you feeling now?</h2>
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`text-4xl ${value <= mood ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => handleMoodSelection(value)}
            disabled={hasSelected}
          >
            {["😢", "😟", "😐", "😊", "😄"][value - 1]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
