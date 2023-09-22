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
      <h1 className="">
        On the run and looking for quick stats for a specific period of time?
      </h1>
      <CustomRange />

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
