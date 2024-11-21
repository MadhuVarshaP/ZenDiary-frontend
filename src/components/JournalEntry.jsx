import axios from "axios";
import React, { useState } from "react";

const JournalEntry = ({ addEntry }) => {
  const [entry, setEntry] = useState("");

  const handleSave = async () => {
    if (entry.trim()) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to add a journal entry.");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/journal/add",
          { entry },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (response.status === 201) {
          addEntry(response.data.data);
          alert("Journal entry saved successfully!");
        }
      } catch (error) {
        console.error("Error saving journal entry:", error.response || error);
        alert("Failed to save journal entry.");
      }
    } else {
      alert("Please write something before saving!");
    }
  };

  return (
    <div className="bg-lightbrown p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black mb-4 text-center">
        Write Today's Journal
      </h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
      >
        <textarea
          className="w-full h-32 p-3 rounded-lg resize-none focus:outline-none bg-gray-100"
          placeholder="Write a short entry for today..."
          maxLength="100"
          value={entry}
          onChange={e => setEntry(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="bg-black px-6 py-2 rounded-2xl text-white font-semibold"
          >
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalEntry;
