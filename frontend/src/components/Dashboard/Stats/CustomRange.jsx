import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./react-datepicker.css";
import { useAuth } from "../../../utils/useAuth";

function CustomRangeComponent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [sleepDuration, setSleepDuration] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const { auth } = useAuth();

  const fetchData = async () => {
    if (!startDate || !endDate) {
      return;
    }

    try {
      const avgRatingResponse = await fetch("/api/calculate_average_rating", {
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

      if (avgRatingResponse.ok) {
        const avgRatingData = await avgRatingResponse.json();
        setAverageRating(avgRatingData.average_rating);
      } else {
        console.error(
          "Error fetching average rating:",
          avgRatingResponse.statusText
        );
      }

      const sleepDurationResponse = await fetch(
        "/api/calculate_sleep_duration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
          }),
        }
      );

      if (sleepDurationResponse.ok) {
        const sleepDurationData = await sleepDurationResponse.json();
        setSleepDuration(sleepDurationData.total_duration);
      } else {
        console.error(
          "Error fetching sleep duration:",
          sleepDurationResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setDataFetched(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.token, startDate, endDate]);

  return (
    <div>
      <h2>Custom Data Range</h2>
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
      {dataFetched ? (
        <>
          {averageRating !== null && (
            <p>
              Your average rating for that period of time is of {averageRating}{" "}
              out of 5.
            </p>
          )}
          {sleepDuration !== null && (
            <p>
              You've slept {sleepDuration.toFixed(2)} hours between the two
              dates you've picked.
            </p>
          )}
        </>
      ) : (
        <p>Waiting for you to pick two dates...</p>
      )}
    </div>
  );
}

export default CustomRangeComponent;
