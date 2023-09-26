import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import DummyCalendar from "./DummyCalendar";

function GuestView() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const dataChart = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Hours of Sleep",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [6, 7, 6.5, 7.5, 6.8],
      },
      {
        backgroundColor: ["#FF5733", "#FFC300", "#C70039", "#900C3F"],
      },
    ],
    options: {
      responsive: true,
    },
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center p-10">
      <div className="">
        <h1 className="font-heading">What is sleepyLog?</h1>
        <p>
          sleepyLog is a personalized sleep tracker app designed to help
          visualize trends and sleeping patterns. If you find that you have
          unconsistent rest and would like to know why, hopefully this helps you
          satisfy your curiosity and take action if there's any indicators
          through our data visualisation to having a good night's rest.
        </p>
        <div className="calendar-container pb-2">
          <DummyCalendar />
        </div>
      </div>
      <div>
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
        <div>
          {Object.keys(dataChart).length > 0 ? (
            <Doughnut data={dataChart} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuestView;
