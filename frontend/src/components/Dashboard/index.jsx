import React, { useState } from "react";
import CalendarView from "./Calendar";
import Stats from "./Stats/Stats";
import Profile from "./Profile/Profile";
import snork from "../../assets/images/snork.png";
import mimi from "../../assets/images/mimi.png";
import { useAuth } from "../../utils/useAuth";
import EntryModal from "./Calendar/Entries Modal";
import EntryForm from "./Calendar/Entries Modal/Entries";
import Guide from "./Guide";
import { RiCloseCircleLine } from "react-icons/ri";

function Dashboard() {
  const { auth } = useAuth();
  const [selectedTab, setSelectedTab] = useState("calendar");
  const [showGuide, setShowGuide] = useState(false);
  const [entryModalIsOpen, setEntryModalIsOpen] = useState(false);

  const openEntryModal = () => {
    setEntryModalIsOpen(true);
  };

  const closeEntryModal = () => {
    setEntryModalIsOpen(false);
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="flex flex-col w-full lg:w-2/3 text-center">
        <h1 className="font-logo text-xl">
          Welcome to your dashboard, {auth.user.username}!
        </h1>
        <p className="px-5 flex-center text-justify">
          Welcome to your dashboard. Below you will find your logbook,
          information on your sleeping patterns, and access to your profile.
          Remember to track your sleep as often as you can! The more consistent
          you are with your entries, the better and more accurate the metrics
          will be.
        </p>
      </div>
      <br />
      <div className="flex">
        <img
          src={snork}
          alt="moon sleeping wearing a nightcap"
          className="h-20 pr-10 "
        />
        <button
          aria-label="open add an entry form"
          className="font-logo new-entry"
          onClick={openEntryModal}
        >
          Add an entry!
        </button>
        <img
          src={mimi}
          alt="sun looking happy wearing a sunhat"
          className="h-20 pl-10"
        />
      </div>
      <div className="flex flex-col items-center">
        <button
          aria-label="open guide"
          className="text-sm font-logo border-2 rounded-xl px-2 dark:border-secondary border-primary dark:text-black text-white dark:bg-primary bg-secondary hover:border-accent dark:hover:border-accent"
          onClick={toggleGuide}
        >
          Help?
        </button>
        {showGuide && (
          <div className="flex flex-col items-center">
            <Guide />
            <button
              aria-label="close guide"
              className="hover:underline decoration-accent mt-2 cursor-pointer bouncey"
              onClick={toggleGuide}
              style={{ fontSize: "22px" }}
            >
              <RiCloseCircleLine />
            </button>
          </div>
        )}
      </div>
      <EntryModal
        isOpen={entryModalIsOpen}
        onRequestClose={closeEntryModal}
        onEntrySuccess={closeEntryModal}
      >
        <EntryForm onEntrySuccess={closeEntryModal} />
      </EntryModal>
      <br />

      <div className="tab-nav mb-3 font-logo">
        <button
          aria-label="open calendar tab"
          onClick={() => setSelectedTab("calendar")}
          className={
            selectedTab === "calendar" ? "active pr-8 font-bold" : "pr-8"
          }
        >
          Calendar
        </button>
        <button
          aria-label="open stats tab"
          onClick={() => setSelectedTab("stats")}
          className={selectedTab === "stats" ? "active pr-8 font-bold" : "pr-8"}
        >
          Stats
        </button>
        <button
          aria-label="open profile tab"
          onClick={() => setSelectedTab("profile")}
          className={
            selectedTab === "profile" ? "active pr-8 font-bold" : "pr-8"
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
