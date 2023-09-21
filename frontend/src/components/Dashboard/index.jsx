import React, { useState } from "react";
import CalendarView from "./Calendar";
import Stats from "./Stats/Stats";
import Profile from "./Profile";
import snork from "../../assets/images/snork.png";
import mimi from "../../assets/images/mimi.png";
import { useAuth } from "../../utils/useAuth";
import EntryModal from "./Entries Modal";
import EntryForm from "./Entries Modal/Entries";

function Dashboard() {
  const { auth } = useAuth();
  const [selectedTab, setSelectedTab] = useState("calendar");

  const [entryModalIsOpen, setEntryModalIsOpen] = useState(false);

  const openEntryModal = () => {
    setEntryModalIsOpen(true);
  };

  const closeEntryModal = () => {
    setEntryModalIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="font-heading">
        Welcome to Your Dashboard, {auth.user.username}!
      </h1>
      <p className="mx-4 px-5">
        Welcome to your dashboard. Below you will find your logbook, information
        on your sleeping patterns, and access to your profile. Remember to track
        your sleep as often as you can! The more consistent you are with your
        entries, the better and more accurate the metrics will be.{" "}
      </p>

      <br />

      <div className="flex">
        <img
          src={snork}
          alt="moon sleeping wearing a nightcap"
          className="h-20 pr-10"
        />
        <button className="font-heading" onClick={openEntryModal}>Add an entry!</button>
        <EntryModal
          isOpen={entryModalIsOpen}
          onRequestClose={closeEntryModal}
          onEntrySuccess={closeEntryModal}
        >
          <EntryForm onEntrySuccess={closeEntryModal} />
        </EntryModal>
        <img
          src={mimi}
          alt="sun looking happy wearing a sunhat"
          className="h-20 pl-10"
        />
      </div>
      <br />

      <div className="tab-nav">
        <button
          onClick={() => setSelectedTab("calendar")}
          className={
            selectedTab === "calendar" ? "active pr-10 font-bold" : "pr-10"
          }
        >
          Calendar
        </button>
        <button
          onClick={() => setSelectedTab("stats")}
          className={
            selectedTab === "stats" ? "active pr-10 font-bold" : "pr-10"
          }
        >
          Stats
        </button>
        <button
          onClick={() => setSelectedTab("profile")}
          className={
            selectedTab === "profile" ? "active pr-10 font-bold" : "pr-10"
          }
        >
          Profile
        </button>
      </div>

      {selectedTab === "calendar" && <CalendarView />}
      {selectedTab === "stats" && <Stats />}
      {selectedTab === "profile" && <Profile />}
    </div>
  );
}

export default Dashboard;
