import React, { useEffect, useState } from "react";
import MoodTracker from "../components/MoodTracker";
import AffirmationBoard from "../components/AffirmationBoard";
import JournalEntry from "../components/JournalEntry";
import ProgressCalendar from "../components/ProgressCalendar";
import JournalTimeline from "../components/JournalTimeline";
import MoodSelector from "../components/MoodSelector";
import streaks from "../assets/streaks.webp";
import axios from "axios";
import WeatherForecast from "../components/WeatherForecast";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [affirmation, setAffirmation] = useState("");

  const handleMoodSelect = mood => {
    console.log("User mood selected:", mood);
  };

  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/affirmations/"
        );
        setAffirmation(response.data.affirmation || response.data);
      } catch (error) {
        console.error("Error fetching affirmation:", error);
      }
    };

    fetchAffirmation();
  }, []);

  const handleSelectSlot = slotInfo => {
    const title = prompt("New Event Title");
    if (title) {
      setEvents(prevEvents => [
        ...prevEvents,
        { title, start: slotInfo.start, end: slotInfo.end, completed: false }
      ]);
    }
  };

  const toggleCompletion = eventToToggle => {
    setEvents(prevEvents =>
      prevEvents.map(
        event =>
          event === eventToToggle
            ? { ...event, completed: !event.completed }
            : event
      )
    );
  };

  const addEntry = newEntry => {
    setEntries([
      ...entries,
      { entry: newEntry, date: new Date().toLocaleString() }
    ]);
  };

  return (
    <div className="bg-beige min-h-screen p-3">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column */}
        <div className="space-y-6 md:col-span-3 m-3">
          <MoodTracker onMoodSelect={handleMoodSelect} />
          <JournalTimeline entries={entries} />
        </div>

        {/* Middle (Center) Column */}
        <div className="space-y-8 md:col-span-6 m-3">
          <MoodSelector onMoodSelect={handleMoodSelect} />
          <AffirmationBoard affirmation={affirmation} />
          <JournalEntry addEntry={addEntry} />
        </div>

        {/* Right Column */}
        <div className="space-y-8 md:col-span-3 m-3">
          <ProgressCalendar
            events={events}
            handleSelectSlot={handleSelectSlot}
            toggleCompletion={toggleCompletion}
          />
          <WeatherForecast />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
