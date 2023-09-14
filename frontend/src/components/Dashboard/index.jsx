import React, { useState } from "react";
import Calendar from "./Calendar";
import Stats from "./Stats";
import Profile from "./Profile";
import snork from "../../assets/images/snork.png";
import mimi from "../../assets/images/mimi.png";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("calendar");

  // Your component code here...

  return (
    <div>
      <h1 className="font-heading">Welcome to Your Dashboard, ____</h1>
      <p>
        Welcome to your dashboard. Below you will find your logbook, information
        on your sleeping patterns, and access to your profile. Remember to track
        your sleep as often as you can! The more consistent you are with your
        entries, the better and more accurate the metrics will be.{" "}
      </p>

      <h1>
        <img src={snork} alt="moon sleeping wearing a nightcap" />
        Add an entry!
        <img src={mimi} alt="sun looking happy wearing a sunhat" />
      </h1>

      <div className="tab-nav">
        <button
          onClick={() => setSelectedTab("calendar")}
          className={selectedTab === "calendar" ? "active" : ""}
        >
          Calendar
        </button>
        <button
          onClick={() => setSelectedTab("stats")}
          className={selectedTab === "stats" ? "active" : ""}
        >
          Stats
        </button>
        <button
          onClick={() => setSelectedTab("profile")}
          className={selectedTab === "profile" ? "active" : ""}
        >
          Profile
        </button>
      </div>

      {selectedTab === "calendar" && <Calendar />}
      {selectedTab === "stats" && <Stats />}
      {selectedTab === "profile" && <Profile />}
    </div>
  );
}

export default Dashboard;
