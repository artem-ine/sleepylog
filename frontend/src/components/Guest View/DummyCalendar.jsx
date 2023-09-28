import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import lil_icons from "../../assets/images/lil_icons.png";
import SignupForm from "../Signup Modal/SignupForm";
import SignupModal from "../Signup Modal";
import "../../index.css";
import "../Dashboard/Calendar/Calendar.css";
import {
  FaFaceGrinWide,
  FaFaceSmile,
  FaFaceMeh,
  FaFaceSadTear,
  FaFaceSadCry,
} from "react-icons/fa6";

function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(selectedDate);
  const [selectedDummyEntry, setSelectedDummyEntry] = useState(null);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [dummyCalendarData, setDummyCalendarData] = useState([]);

  const openSignupModal = () => {
    setSignupModalIsOpen(true);
  };

  const closeSignupModal = () => {
    setSignupModalIsOpen(false);
  };

  const startOfWeek = moment().startOf("month");
  const possibleRatings = ["horrible", "mediocre", "OK", "good", "perfect"];
  const possibleDuration = [1, 3, 10, 8, 9, 7];
  const possibleNotes = [
    "Had a great night's sleep!",
    "Woke up feeling refreshed.",
    "Slept like a baby.",
    "Could have slept longer.",
    "Need more sleep next time.",
  ];

  useEffect(() => {
    const initialDummyCalendarData = [];

    for (let i = 0; i < 30; i++) {
      const date = startOfWeek.clone().add(i, "days").toDate();
      const nextDay = moment(date).add(1, "day").toDate();
      const randomRatingIndex = Math.floor(
        Math.random() * possibleRatings.length
      );
      const randomDurationIndex = Math.floor(
        Math.random() * possibleDuration.length
      );
      const randomNoteIndex = Math.floor(Math.random() * possibleNotes.length);
      const notes = possibleNotes[randomNoteIndex];
      const rating = possibleRatings[randomRatingIndex];
      const duration = possibleDuration[randomDurationIndex];

      const entry = {
        start_time: date,
        end_time: nextDay,
        rating,
        duration,
        notes,
      };
      initialDummyCalendarData.push(entry);
    }

    setDummyCalendarData(initialDummyCalendarData);
  }, []);

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

  function renderRatingIcon(rating) {
    switch (rating) {
      case "horrible":
        return <FaFaceSadCry style={{ color: "#790119" }} />;
      case "mediocre":
        return <FaFaceSadTear style={{ color: "#CC6600" }} />;
      case "OK":
        return <FaFaceMeh style={{ color: "#E3A92C" }} />;
      case "good":
        return <FaFaceSmile style={{ color: "#B3B319" }} />;
      case "perfect":
        return <FaFaceGrinWide style={{ color: "#4f8f00" }} />;
      default:
        return null;
    }
  }

  return (
    <>
      <div className="calendar-view-container flex items-center">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            onClickDay={(date) => setClickedDate(date)}
            tileContent={({ date }) => {
              const dummyEntries = dummyCalendarData.filter((entry) =>
                moment(entry.start_time).isSame(date, "day")
              );

              if (dummyEntries.length === 0) {
                return null;
              }

              return (
                <div className="calendar-emoji">
                  {dummyEntries.map((entry, index) => (
                    <span
                      key={index}
                      className="mr-1"
                      title={`Quality rating: ${entry.rating}`}
                    >
                      {renderRatingIcon(entry.rating)}
                    </span>
                  ))}
                </div>
              );
            }}
          />
        </div>
        <div className="flex justify-center">
          <img
            src={lil_icons}
            alt="doodled sun and moon with a cloud"
            className="h-15 move-up-and-down"
          />
        </div>
        <div className="logged-items-container border-secondary dark:border-primary border-2 rounded-2xl p-2">
          <div className="flex justify-evenly items-center pb-1">
            <h2 className="font-heading dark:text-white text-black text-sm mt-2">
              {moment(clickedDate).format("LL")}
            </h2>
          </div>

          <div className="overflow-y-auto h-56 pt-2 px-1 flex flex-col justify-around items">
            <ul className="dark:text-white text-black text-sm px-2">
              {filteredItems.map((dummyEntry, index) => (
                <li key={index} className="flex flex-col mb-5">
                  <div key={index} className="dummy-entry">
                    <p className="font-logo dark:text-white text-black mb-3 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
                      Sleep Entry
                    </p>
                    <p className="dark:text-white text-black">
                      Start time:{" "}
                      {moment(dummyEntry.start_time).format("DD/MM/YYYY")}
                    </p>
                    <p className="dark:text-white text-black">
                      End time:{" "}
                      {moment(dummyEntry.end_time).format("DD/MM/YYYY")}
                    </p>
                    <p className="dark:text-white text-black">
                      Hours slept: {dummyEntry.duration}
                    </p>
                    <p className="dark:text-white text-black flex gap-2 items-center">
                      <span className="">Quality rating:</span>
                      <span className="text-xl">
                        {renderRatingIcon(dummyEntry.rating)}
                      </span>
                    </p>
                    <p className="dark:text-white text-black mt-5">
                      Notes: {dummyEntry.notes}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <button
                aria-label="open sign up form"
                className="bg-secondary dark:bg-primary text-white dark:text-black border border-black hover:border-accent hover:border-2 font-bold text-sm py-1 px-4 rounded-xl"
                onClick={openSignupModal}
              >
                Join sleepyLog and start logging now!
              </button>
            </div>
          </div>
        </div>
      </div>
      <SignupModal
        isOpen={signupModalIsOpen}
        onRequestClose={closeSignupModal}
        openSignupModal={closeSignupModal}
      >
        <SignupForm onSignupSuccess={closeSignupModal} />
      </SignupModal>
    </>
  );
}

export default CalendarView;
