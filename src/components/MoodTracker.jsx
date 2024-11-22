import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MoodTracker = () => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      if (!token) {
        alert("You are not logged in. Please log in to view your mood data.");
        return;
      }

      try {
        const response = await axios.get("https://zendiary-backend.vercel.app/api/moods/mood-data", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        });

        // Transform data for the chart
        const formattedData = response.data.map((entry) => ({
          ...entry,
          date: new Date(entry.date).toLocaleDateString(), // Format date for display
        }));

        setMoodData(formattedData);
      } catch (error) {
        console.error("Error fetching mood data:", error.response);
        alert("Error fetching mood data: " + (error.response?.data?.message || error.message));
      }
    };

    fetchMoodData();
  }, []);

  return (
    <div className="relative w-full p-6 rounded-lg shadow-lg bg-red-100">
      <h3 className="text-lg font-bold text-black mb-4 text-center">Mood Tracker</h3>
      {moodData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#4A5568" }}
              axisLine={{ stroke: "#CBD5E0" }}
              tickLine={false}
            />
            <YAxis
              domain={[1, 5]}
              tick={{ fill: "#4A5568" }}
              axisLine={{ stroke: "#CBD5E0" }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F7FAFC",
                borderColor: "#E2E8F0",
              }}
            />
            <Legend wrapperStyle={{ color: "#4A5568", fontSize: "14px" }} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#FE3C8D"
              strokeWidth={3}
              dot={{ r: 6, fill: "#FF7F7F" }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No mood data available. Start tracking your mood!</p>
      )}
    </div>
  );
};

export default MoodTracker;
