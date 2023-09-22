import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line from 'react-chartjs-2'

function SleepDurationPastMonth() {
  const [sleepData, setSleepData] = useState({});
  const labels = Object.keys(sleepData);
  const sleepDurations = Object.values(sleepData);

  useEffect(() => {
    fetch("/api/sleep_duration_past_month")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSleepData(data.sleep_data);
      })
      .catch((error) => {
        console.error("Error fetching sleep duration data:", error);
      });
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sleep Duration (hours)",
        data: sleepDurations,
        borderColor: "rgba(75, 192, 192, 0.5)", // Set line color
        backgroundColor: "rgba(0, 0, 0, 0)", // Set background color to transparent
        borderWidth: 2, // Set line width
        fill: false, // Set to false to have an unfilled line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sleep Duration for the Past Month",
      },
    },
    scales: {
      y: {
        suggestedMax: 24,
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Sleep Duration for the Past Month</h2>
      <div className="chart-wrapper">
        {Object.keys(sleepData).length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SleepDurationPastMonth;
