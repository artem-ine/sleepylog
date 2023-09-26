import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sun_icon from "../../assets/images/sun_icon.png";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const [selectedDummyEntry, setSelectedDummyEntry] = useState(null);

  const startOfWeek = moment().startOf("week");
  const possibleRatings = ["horrible", "mediocre", "OK", "good", "perfect"];
  const possibleDuration = [1, 3, 10, 8, 9, 7];
  const dummyCalendarData = [];

  for (let i = 0; i < 7; i++) {
    const date = startOfWeek.clone().add(i, "days").toDate();
    const randomRatingIndex = Math.floor(
      Math.random() * possibleRatings.length
    );
    const randomDurationIndex = Math.floor(
      Math.random() * possibleDuration.length
    );
    const rating = possibleRatings[randomRatingIndex];
    const duration = possibleDuration[randomDurationIndex];

    const entry = {
      start_time: date,
      rating,
      duration,
    };
    dummyCalendarData.push(entry);
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDummyEntry(date);
  };

  useEffect(() => {
    setClickedDate(selectedDate);
  }, [selectedDate]);

  const filteredItems = dummyCalendarData.filter((item) =>
    moment(item.start_time).isSame(selectedDate, "day")
  );

  return (
    <>
      <div className="calendar-view-container">
        <div className="calendar-container pb-2">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            onClickDay={(date) => setClickedDate(date)}
            tileContent={({ date }) => {
              const dummyEntry = dummyCalendarData.find((entry) =>
                moment(entry.start_time).isSame(date, "day")
              );

              if (dummyEntry) {
                return <div className="calendar-dot" />;
              }

              return null;
            }}
          />
        </div>
        <div className="logged-items-container border-secondary dark:border-primary border-2 rounded-2xl p-2">
          <div className="flex justify-evenly items-center pb-1">
            <h2 className="font-heading dark:text-white text-black text-sm mt-2">
              {moment(clickedDate).format("LL")}
            </h2>
            <img
              src={sun_icon}
              alt="doodled sun with a cloud"
              className="h-9"
            />
          </div>

          <div className="overflow-y-auto h-56 pt-2 px-1">
            {filteredItems.map((dummyEntry, index) => (
              <div key={index} className="dummy-entry">
                <p className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
                  Entry data
                </p>
                <p className="dark:text-white text-black">
                  Start time:{" "}
                  {moment(dummyEntry.start_time).format("DD/MM/YYYY")}
                </p>
                {dummyEntry.end_time && (
                  <p className="dark:text-white text-black">
                    End time: {moment(dummyEntry.end_time).format("DD/MM/YYYY")}
                  </p>
                )}
                {dummyEntry.duration && (
                  <p className="dark:text-white text-black">
                    Hours slept: {dummyEntry.duration}
                  </p>
                )}
                <p className="dark:text-white text-black">
                  Quality rating: {dummyEntry.rating}
                </p>
                {dummyEntry.notes && (
                  <p className="dark:text-white text-black">
                    Notes: {dummyEntry.notes}
                  </p>
                )}
              </div>
            ))}
            <button
              className="h-8 px-4 bg-secondary dark:bg-primary border-2 border-secondary dark:border-primary hover:border-accent font-bold text-white dark:text-black text-sm rounded-xl"
              onClick={() => handleEditClick(null)} // Handle the click to open the sign-up modal
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarView;
