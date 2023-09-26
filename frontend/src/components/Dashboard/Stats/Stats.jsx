import SleepDurationPastWeek from "./SleepDurationPastWeek";
import CustomRange from "./CustomRange";
import SleepDurationPastMonth from "./SleepDurationPastMonth";
import AverageRatingPastWeek from "./AverageRatingWeek";
import AverageRatingPastMonth from "./AverageRatingMonthly";
import { useAuth } from "../../../utils/useAuth";
import { useState } from "react";

function Stats() {
  const [selectedTab, setSelectedTab] = useState("past-week");

  return (
    <>
      <div className="border-2 flex flex-col lg:flex-row lg:space-x-6 dark:border-primary border-secondary px-3 rounded-xl py-5 items-center">
        <div className="lg:w-1/2">
          <div className="lg:flex lg:flex-row lg:space-y-4">
            <button
              onClick={() => setSelectedTab("past-week")}
              className={
                selectedTab === "past-week"
                  ? "active pr-10 font-bold font-logo"
                  : "p-2 font-logo"
              }
            >
              Stats past week
            </button>
            <button
              onClick={() => setSelectedTab("past-month")}
              className={
                selectedTab === "past-month"
                  ? "active pr-10 font-bold font-logo"
                  : "p-2 font-logo"
              }
            >
              Stats past month
            </button>
          </div>
          {selectedTab === "past-week" && (
            <div className="lg:flex lg:space-x-4">
              <div className="">
                <AverageRatingPastWeek />
              </div>
              <div className="">
                <SleepDurationPastWeek />
              </div>
            </div>
          )}
          {selectedTab === "past-month" && (
            <div className="lg:flex lg:space-x-4">
              <div className="">
                <AverageRatingPastMonth />
              </div>
              <div className="">
                <SleepDurationPastMonth />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* "Looking for quick stats on a specific period of time?" section */}
      <div className="border-2 dark:border-primary border-secondary p-3 rounded-xl py-5 mt-4">
        <h1 className="dark:text-white text-black mb-2 border dark:border-primary border-secondary rounded-lg dark:bg-secondary bg-primary px-2 py-1">
          Looking for quick stats on a specific period of time? Use our
          calculator!
        </h1>
        <CustomRange />
      </div>
    </>
  );
}

export default Stats;
