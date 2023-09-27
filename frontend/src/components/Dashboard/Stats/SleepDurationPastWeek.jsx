import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line from 'react-chartjs-2'

function SleepDurationPastWeek() {
  const [sleepData, setSleepData] = useState({});
  const labels = Object.keys(sleepData);
  const sleepDurations = Object.values(sleepData);
  const [totalDuration, setTotalDuration] = useState(null);

  useEffect(() => {
    fetch("/api/sleep_duration_past_week")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSleepData(data.sleep_data);
        setTotalDuration(data.total_duration);
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
        borderColor: "#AFC1D6",
        backgroundColor: "#AFC1D6",
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-heading text-sm pb-3">Sleep duration</h2>
      <div className="chart-wrapper">
        {Object.keys(sleepData).length > 0 ? (
          <Line data={data} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <br />
      {totalDuration !== null && (
        <p>You've slept a total of {totalDuration} hours this week.</p>
      )}
    </div>
  );
}

export default SleepDurationPastWeek;
