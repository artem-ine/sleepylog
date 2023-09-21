import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../utils/useAuth";

function SleepDurationCustomRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);
  const { auth } = useAuth();

  const fetchSleepDuration = async () => {
    if (!startDate || !endDate) {
      return;
    }

    try {
      const response = await fetch("/api/calculate_sleep_duration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        }),
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
  }, [auth.token, startDate, endDate]);

  return (
    <div>
      <h2>Custom Sleep Duration</h2>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      {totalDuration !== null ? (
        <p>Total Duration: {totalDuration.toFixed(2)} hours</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SleepDurationCustomRange;
