import React, { useState, useEffect } from "react";
import { useAuth } from "../../../utils/useAuth";

function AverageRatingPastWeek() {
  const [averageRating, setAverageRating] = useState(null);
  const { auth } = useAuth();

  const fetchWeeklyRating = async () => {
    try {
      const response = await fetch("/api/average_rating_past_week", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
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
    fetchWeeklyRating();
  }, [auth.token]);

  return (
    <div>
      <h2>Average Rating (Past Week)</h2>
      {averageRating !== null ? (
        <p>Average rating out of 5: {averageRating}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AverageRatingPastWeek;
