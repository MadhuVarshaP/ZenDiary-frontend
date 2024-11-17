import React, { useState } from "react";

const JournalEntry = ({ addEntry }) => {
  const [entry, setEntry] = useState("");

  const handleSave = () => {
    if (entry.trim()) {
      addEntry(entry);
      setEntry("");
    } else {
      alert("Please write something before saving!");
    }
  };

  return (
    <div className="bg-lightbrown p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-black mb-4 text-center">
        Write Today's Journal
      </h3>
      <textarea
        className="w-full h-32 p-3 rounded-lg resize-none focus:outline-none bg-gray-100"
        placeholder="Write a short entry for today..."
        maxLength="100"
        value={entry}
        onChange={e => setEntry(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <button
          className="bg-black px-6 py-2 rounded-2xl text-white font-semibold"
          onClick={handleSave}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default JournalEntry;
