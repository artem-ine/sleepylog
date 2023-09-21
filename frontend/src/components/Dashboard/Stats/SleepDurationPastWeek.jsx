import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/useAuth";

function SleepDurationPastWeek() {
  const [totalDuration, setTotalDuration] = useState(null);
  const { auth } = useAuth();

  const fetchSleepDuration = async () => {
    try {
      const response = await fetch("/api/sleep_duration_past_week", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTotalDuration(data.total_duration);
      } else {
        console.error("Error fetching sleep duration:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sleep duration:", error);
    }
  };

  useEffect(() => {
    fetchSleepDuration();
  }, [auth.token]);

  return (
    <div>
      <h2>Sleep Duration (Past Week)</h2>
      {totalDuration !== null ? (
        <p>Total Duration: {totalDuration.toFixed(2)} hours</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SleepDurationPastWeek;
