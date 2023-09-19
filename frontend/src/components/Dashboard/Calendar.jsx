import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useAuth } from "../../utils/useAuth";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedItems, setLoggedItems] = useState([]);
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserLogbookEntries = async () => {
      try {
        const response = await fetch("/api/entries", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedItems(data);
          console.log("Logged Items:", data);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching logbook entries:", error);
      }
    };

    fetchUserLogbookEntries();
  }, [auth]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  useEffect(() => {
    setClickedDate(selectedDate);
  }, [selectedDate]);

  console.log(clickedDate);

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const startOfDayDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const itemsForDate = loggedItems.filter((item) =>
        moment(item.start_time).isSame(startOfDayDate, "day")
      );

      if (itemsForDate.length > 0) {
        return <div className="calendar-dot" />;
      }
    }

    return null;
  };

  const filteredItems = loggedItems.filter((item) =>
    moment(item.start_time).isSame(selectedDate, "day")
  );

  console.log(filteredItems);

  return (
    <div className="calendar-view-container">
      <div className="calendar-container bg-primary">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileContent={tileContent}
          onClickDay={(date) => setClickedDate(date)}
        />
      </div>
      
      <div className="logged-items-container bg-primary rounded-xl px-3">
        <h2 className="font-heading text-black text-sm mt-5 mb-2">{moment(clickedDate).format("LL")}</h2>
        <div className="scrollable-notes">
          <ul className="text-black text-sm">
            {filteredItems.map((item) => (
              <li key={item.id}>
                <strong>{item.date}</strong>
                <p>Hours slept: {item.duration}</p>
                <p>Quality rating: {item.quality}</p>
                <p>Notes: {item.notes}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
