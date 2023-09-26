import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import DummyCalendar from "./DummyCalendar";
import DummyChart from "./DummyChart";

function GuestView() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="flex flex-col w-1/2 justify-center p-3">
        <h1 className="font-heading">What is sleepyLog?</h1>
        <p>
          sleepyLog is a personalized sleep tracker app designed to help
          visualize trends and sleeping patterns. If you find that you have
          unconsistent rest and would like to know why, hopefully this helps you
          satisfy your curiosity and take action if there's any indicators
          through our data visualisation to having a good night's rest.
        </p>
      </div>
      <div className="calendar-container pb-2">
        <DummyCalendar />
      </div>
      <div className="flex flex-col w-1/2 justify-center p-3">
        <h1 className="font-heading">Ok, great! But what do you do exactly?</h1>
        <p>
          Treat sleepyLog as an e-diary or sleep journal - but better! Unlike
          jotting your notes in traditional pen and paper, we can store all of
          your entries as data to create easy-to-view stats based on how often
          and how much you log in your personal journal. That's much simpler and
          easier than flipping through pages and manually calculating how often
          you've had a good night's rest within the past week, months, or even
          years!
        </p>
      </div>
      <div className="pb-10 flex justify-center">
        <DummyChart />
      </div>
    </div>
  );
}

export default GuestView;
