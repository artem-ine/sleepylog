import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedItems, setLoggedItems] = useState([
    // Dummy logged items for demonstration
    {
      id: 1,
      title: "Meeting",
      date: moment().format("YYYY-MM-DD"), // Store the date in a consistent format
      description: "Meeting with the team",
    },
    {
      id: 2,
      title: "Task 1",
      date: moment().add(1, "day").format("YYYY-MM-DD"),
      description: "Complete task 1",
    },
    {
      id: 3,
      title: "Task 2",
      date: moment().add(1, "day").format("YYYY-MM-DD"),
      description: "Complete task 2",
    },
  ]);

  // Handle calendar date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // display items
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      // Filter logged items for the current date
      const itemsForDate = loggedItems.filter(
        (item) => item.date === moment(date).format("YYYY-MM-DD")
      );

      // If there are items for the date, return a dot or custom content
      if (itemsForDate.length > 0) {
        return <div className="calendar-dot" />;
      }
    }

    return null;
  };

  // Filter logged items for the selected date
  const filteredItems = loggedItems.filter(
    (item) => item.date === moment(selectedDate).format("YYYY-MM-DD")
  );

  return (
    <div className="calendar-view-container">
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
        />
      </div>
      <div className="logged-items-container">
        <h2>Logs for {moment(selectedDate).format("LL")}</h2>
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CalendarView;
