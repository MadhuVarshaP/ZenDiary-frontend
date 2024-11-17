import React, { useState } from "react";
import MoodTracker from "../components/MoodTracker";
import AffirmationBoard from "../components/AffirmationBoard";
import JournalEntry from "../components/JournalEntry";
import ProgressCalendar from "../components/ProgressCalendar";
import JournalTimeline from "../components/JournalTimeline";
import MoodSelector from "../components/MoodSelector";
import streaks from "../assets/streaks.webp";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [entries, setEntries] = useState([]);
  const [affirmation, setAffirmation] = useState("");
  const [data, setData] = useState([]);

  const handleMoodSelect = mood => {
    console.log("User mood selected:", mood);
  };

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-beige p-3 m-3 h-auto md:h-[90vh]">
      {/* Left Column */}
      <div className="space-y-6 md:col-span-1">
        <MoodTracker onMoodSelect={handleMoodSelect} />
        {/* Streak Section */}
        <div
          className="relative w-full p-6 rounded-lg bg-cover bg-center text-white"
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

      {/* Middle Column */}
      <div className="space-y-8 md:col-span-1">
        <MoodSelector onMoodSelect={handleMoodSelect} />
        <AffirmationBoard affirmation={affirmation} />
        <JournalEntry addEntry={addEntry} />
      </div>

      {/* Right Column */}
      <div className="space-y-8 md:col-span-1">
        <ProgressCalendar
          events={events}
          handleSelectSlot={handleSelectSlot}
          toggleCompletion={toggleCompletion}
        />
        <JournalTimeline entries={entries} />
      </div>
    </div>
  );
};

export default Dashboard;
