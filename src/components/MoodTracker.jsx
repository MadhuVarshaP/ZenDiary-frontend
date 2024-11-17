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
  ResponsiveContainer
} from "recharts";

const MoodTracker = ({ data }) => {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get("/api/mood-data");
        setMoodData(response.data);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();
  }, []);
  const chartData = {
    labels: moodData.map(entry => entry.date),
    datasets: [
      {
        label: "Mood Level",
        data: moodData.map(entry => entry.mood),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1
      }
    ]
  };
  return (
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
              borderColor: "#E2E8F0"
            }}
          />
          <Legend wrapperStyle={{ color: "#4A5568", fontSize: "14px" }} />
          <Line
            data={chartData}
            type="monotone"
            dataKey="mood"
            stroke="#FE3C8D"
            strokeWidth={3}
            dot={{ r: 6, fill: "#FF7F7F" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodTracker;
