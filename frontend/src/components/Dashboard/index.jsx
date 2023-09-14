import React, { useState } from "react";
import Calendar from "./Calendar";
import Stats from "./Stats";
import Profile from "./Profile";

function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("calendar");

  // Your component code here...

  return (
    <div>
      {/* Welcome message */}
      <h1>Welcome to Your Dashboard</h1>

      {/* Tab Navigation */}
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
