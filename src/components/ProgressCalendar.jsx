import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const ProgressCalendar = ({ events, handleSelectSlot, toggleCompletion }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-black mb-4">Progress Calendar</h2>
      <div className="rounded-lg overflow-hidden shadow-inner bg-gradient-to-br from-[#f5f5f5] to-[#eaeaea] p-4 h-[400px]">
        <Calendar
          localizer={localizer}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
          popup
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.completed ? "#d1fae5" : "#ff8080",
              color: event.completed ? "#065f46" : "#ff0000",
              textDecoration: event.completed ? "line-through" : "none",
              opacity: event.completed ? 0.9 : 1,
              border: event.completed
                ? "1px solid #10b981"
                : "1px solid #b30000",
              padding: "2px 6px",
              borderRadius: "4px"
            }
          })}
          onSelectEvent={toggleCompletion}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default ProgressCalendar;
