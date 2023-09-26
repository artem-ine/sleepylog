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
      <h2 className="font-logo text-sm px-2 py-2">Date filter:</h2>
      <div className="flex justify-around">
        From
        <DatePicker
          className="bg-white border rounded-xl w-full py-1 px-3 text-black text-sm leading-tight"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        To
        <DatePicker
          className="bg-white border rounded-xl w-full py-1 px-3 text-black text-sm leading-tight"
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
            <p className="dark:text-white text-black mt-2 rounded-lg px-2 py-1">
              Average quality of sleep rated: {averageRating}{" "}
              out of 5.
            </p>
          )}
          {sleepDuration !== null && (
            <p className="dark:text-white text-black rounded-lg px-2 py-1">
              Total amount of sleep logged: {sleepDuration.toFixed(2)} hours.
            </p>
          )}
        </>
      ) : (
        <p className="dark:text-white text-black mt-2 rounded-lg px-2 py-1">Waiting for you to pick two dates...</p>
      )}
    </div>
  );
}

export default CustomRangeComponent;
