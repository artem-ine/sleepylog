import SleepDurationPastWeek from "./SleepDurationPastWeek";
import CustomRange from "./CustomRange";
import SleepDurationPastMonth from "./SleepDurationPastMonth";
import AverageRatingPastWeek from "./AverageRatingWeek";
import AverageRatingPastMonth from "./AverageRatingMonthly";
import { useAuth } from "../../../utils/useAuth";
import { useState } from "react";

function Stats() {
  const { auth } = useAuth();
  const [selectedTab, setSelectedTab] = useState("past-week");

  return (
    <>
      <div className="border dark:border-primary border-secondary p-3 rounded-xl py-5">
        <h1 className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
          Looking for quick stats on a specific period of time? Use our calculator!
        </h1>
        <CustomRange />
      </div>

      <button
        onClick={() => setSelectedTab("past-week")}
        className={
          selectedTab === "past-week" ? "active pr-10 font-bold" : "pr-10"
        }
      >
        Stats past week
      </button>
      <button
        onClick={() => setSelectedTab("past-month")}
        className={
          selectedTab === "past-month" ? "active pr-10 font-bold" : "pr-10"
        }
      >
        Stats past month
      </button>

      {selectedTab === "past-week" && (
        <div className="flex flex-row gap-5">
          <AverageRatingPastWeek />
          <SleepDurationPastWeek />
        </div>
      )}
      {selectedTab === "past-month" && (
        <div className="flex flex-row gap-5">
          <AverageRatingPastMonth />
          <SleepDurationPastMonth />
        </div>
      )}
    </>
  );
}

export default Stats;
