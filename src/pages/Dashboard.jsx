import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import image1 from "../assets/heartbook.png";
import streaks from "../assets/streaks.webp";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { date: "Nov1", mood: 3 },
  { date: "Nov2", mood: 4 },
  { date: "Nov3", mood: 5 },
  { date: "Nov4", mood: 2 },
  { date: "Nov5", mood: 3 }
  // Add more data as needed
];

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [mood, setMood] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [affirmation] = useState("You are capable of amazing things!");
  const [entries, setEntries] = useState([]); // State to store journal entries

  const handleMoodSelection = selectedMood => {
    setMood(selectedMood);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSelectSlot = slotInfo => {
    const title = prompt("New Event Title");
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: slotInfo.start,
          end: slotInfo.end,
          allDay: slotInfo.action === "doubleClick",
          completed: false // New property to track completion
        }
      ]);
    }
  };

  const toggleCompletion = eventToToggle => {
    setEvents(prevEvents =>
      prevEvents.map(
        event =>
          event === eventToToggle
            ? { ...event, completed: !event.completed } // Toggle the 'completed' property
            : event
      )
    );
  };

  const addEntry = entryText => {
    if (entryText.trim()) {
      setEntries([
        ...entries,
        {
          entry: entryText,
          date: moment().format("MMMM Do YYYY, h:mm:ss a") // Format for date
        }
      ]);
    }
  };

  const moodMessage = {
    1: "Don't worry, things will get better!",
    2: "Hang in there!",
    3: "You're doing okay!",
    4: "Great to see you're feeling good!",
    5: "Fantastic! Keep spreading positivity!"
  };

  return (
    <div className="flex min-h-screen bg-beige p-8">
      <div className="w-full md:w-1/4 p-6">
        {/* Mood Tracker */}
        <div className="relative w-full p-6 rounded-lg shadow-lg bg-red-100">
          <h3 className="text-lg font-bold text-black mb-4 text-center">
            Mood Tracker
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#4A5568" }}
                axisLine={{ stroke: "#CBD5E0" }}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                domain={[1, 5]}
                tick={{ fill: "#4A5568" }}
                axisLine={{ stroke: "#CBD5E0" }}
                tickLine={false}
                padding={{ top: 10, bottom: 10 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F7FAFC",
                  borderColor: "#E2E8F0",
                  borderRadius: "0.375rem"
                }}
                labelStyle={{ color: "#2D3748" }}
                itemStyle={{ color: "#4A5568" }}
              />
              <Legend
                wrapperStyle={{ color: "#4A5568", fontSize: "14px" }}
                iconSize={18}
                verticalAlign="top"
                align="center"
                height={36}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#FE3C8D"
                strokeWidth={3}
                dot={{ r: 6, fill: "#FF7F7F" }}
                activeDot={{ r: 10, fill: "#FFB3B3" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          className="mt-8 w-full p-6 rounded-lg bg-cover bg-center text-white relative"
          style={{ backgroundImage: `url(${streaks})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
          <div className="relative z-10 text-center">
            <h4 className="text-2xl font-bold mb-2">Your Streak🔥</h4>
            <p className="text-4xl font-extrabold">5</p>
            <p className="text-lg mt-2">Keep it up! You're doing great.</p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-1/2 p-6 space-y-8">
        <div className="bg-lavender p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black mb-4">
            How are you feeling now?
          </h2>
          <div className="flex justify-around">
            {[1, 2, 3, 4, 5].map(value =>
              <button
                key={value}
                className={`text-4xl ${value <= mood
                  ? "text-yellow-500"
                  : "text-gray-300"}`}
                onClick={() => handleMoodSelection(value)}
              >
                {["😢", "😟", "😐", "😊", "😄"][value - 1]}
              </button>
            )}
          </div>
        </div>

        {/* Affirmation Board */}
        <div className="bg-[#80D4D4] p-6 rounded-lg shadow-md flex justify-between">
          <div>
            <h2 className="text-xl font-bold text-black mb-4">
              Affirmation of the Day!
            </h2>
            <p className="text-gray-700">
              "{affirmation}"
            </p>
          </div>
          <img src={image1} alt="" className="w-20 h-20" />
        </div>
        {/* Journal Entry */}
        <div className="bg-lightbrown p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-black mb-4 text-center">
            Write Today's Journal
          </h3>
          <textarea
            className="w-full h-32 p-3 rounded-lg resize-none focus:outline-none bg-gray-100"
            placeholder="Write a short entry for today..."
            maxLength="300"
            onBlur={e => addEntry(e.target.value)}
          />
          <div className="flex justify-end mt-3">
            <button className="bg-black px-6 py-2 rounded-2xl text-white font-semibold">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Calendar and Timeline */}
      <div className="w-1/4 p-6 space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black mb-4">
            Progress Calendar
          </h2>
          <div style={{ height: "400px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              selectable
              onSelectSlot={handleSelectSlot}
              defaultView="month"
              popup
              eventPropGetter={event => ({
                style: {
                  textDecoration: event.completed ? "line-through" : "none",
                  opacity: event.completed ? 0.5 : 1
                }
              })}
              onSelectEvent={toggleCompletion}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>

        {/* Journal Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-black mb-4 text-center">
            Journal Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full" />
            {entries.map((entry, index) =>
              <div
                key={index}
                className={`mb-8 w-full ${index % 2 === 0
                  ? "text-left"
                  : "text-right"}`}
              >
                <div
                  className={`relative p-4 rounded-lg shadow-md bg-gray-100 ${index %
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
                  <p>
                    {entry.entry}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {entry.date}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mood Selection Popup */}
      {showPopup &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-lg font-bold">
              {moodMessage[mood]}
            </p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-black text-white py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>}
    </div>
  );
};

export default Dashboard;
