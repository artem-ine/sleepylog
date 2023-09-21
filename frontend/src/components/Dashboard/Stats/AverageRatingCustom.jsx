import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../utils/useAuth";

function AverageRatingCustomRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const { auth } = useAuth();

  const fetchAverageRating = async () => {
    if (!startDate || !endDate) {
      return;
    }

    try {
      const response = await fetch("/api/calculate_average_rating", {
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
        setAverageRating(data.average_rating);
      } else {
        console.error("Error fetching sleep duration:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching sleep duration:", error);
    }
  };

  useEffect(() => {
    fetchAverageRating();
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
      {averageRating !== null ? (
        <p>Average rating out of 5: {averageRating}</p>
      ) : (
        <p>Waiting for you to pick two dates...</p>
      )}
    </div>
  );
}

export default AverageRatingCustomRange;
