import React, { useEffect, useState } from "react";
import axios from "axios";
import timer from "../assets/timer.png";
import { Link, Element } from "react-scroll";

const JournalTimeline = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to view your journal.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/journal/entries",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Fetched journal entries:", response.data);

        setEntries(response.data);
      } catch (error) {
        console.error(
          "Error fetching journal entries:",
          error.response || error
        );
        alert("Failed to fetch journal entries.");
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="bg-[#ecffec] p-6 rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-black text-center">
          Journal Timeline
        </h3>
        <img src={timer} className="w-[80px] h-[80px]" alt="Timer" />
      </div>

      {entries.length === 0
        ? <p className="text-center text-gray-500">
            No entries yet. Start journaling today!
          </p>
        : <div className="relative overflow-auto max-h-[200px]">
            {/* Smooth scrolling with react-scroll */}
            <Element
              name="timeline"
              className="timeline-container overflow-y-auto"
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full" />
              {entries.map((entry, index) =>
                <div
                  key={entry._id}
                  className={`mb-8 w-full ${index % 2 === 0
                    ? "text-left"
                    : "text-right"}`}
                >
                  <div
                    className={`relative p-4 rounded-lg shadow-md bg-gray-50 ${index %
                      2 ===
                    0
                      ? "ml-6"
                      : "mr-6"}`}
                  >
                    <span
                      className={`absolute w-4 h-4 rounded-full bg-pink-500 top-4 ${index %
                        2 ===
                      0
                        ? "-left-2"
                        : "-right-2"}`}
                    />
                    <p className="whitespace-pre-wrap break-words text-gray-800">
                      {entry.entry}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(entry.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </Element>
          </div>}
    </div>
  );
};

export default JournalTimeline;
