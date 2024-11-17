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

    try {
      await axios.post("/api/save-mood", { mood: selectedMood });
      setMood(selectedMood); 
      setHasSelected(true); 
      onMoodSelect(selectedMood); 
    } catch (error) {
      alert("Error saving mood data: " + error.response?.data?.message);
    }
  };

  return (
    <div className="bg-lavender p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black mb-4">How are you feeling now?</h2>
      <div className="flex justify-around">
        {[1, 2, 3, 4, 5].map(value => (
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
