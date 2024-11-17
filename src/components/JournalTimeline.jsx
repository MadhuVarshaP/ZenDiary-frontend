import React from "react";
import timer from "../assets/timer.png";

const JournalTimeline = ({ entries }) => {
  return (
    <div className="bg-[#ecffec] p-6 rounded-lg shadow-md max-h-[500px]">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-black mb-4 text-center">
          Journal Timeline
        </h3>
        <img src={timer} className="w-[80px] h-[80px]" />
      </div>
      {entries.length === 0
        ? <p className="text-center text-gray-500">
            No entries yet. Start journaling today!
          </p>
        : <div className="relative overflow-y-auto max-h-[400px]">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full" />
            {entries.map((entry, index) =>
              <div
                key={index}
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
                    {entry.date}
                  </p>
                </div>
              </div>
            )}
          </div>}
    </div>
  );
};

export default JournalTimeline;
