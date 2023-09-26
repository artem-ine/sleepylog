import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function AverageRatingPastWeek() {
  const [ratingsData, setRatingsData] = useState({});
  const [averageRating, setAverageRating] = useState(null);
  const [dataChart, setDataChart] = useState({}); // Declare dataChart as state

  useEffect(() => {
    fetch("/api/average_rating_past_week")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRatingsData(data.ratings_count);
        setAverageRating(data.average_rating);

        ChartJS.register(ArcElement, Tooltip, Legend);
        const dataChart = {
          labels: Object.keys(data.ratings_count),
          datasets: [
            {
              data: Object.values(data.ratings_count),
              backgroundColor: ["#FF5733", "#FFC300", "#C70039", "#900C3F"], // Customize colors as needed
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        };
        setDataChart(dataChart);
      })
      .catch((error) => {
        console.error("Error fetching ratings data:", error);
      });
  }, []);

  return (
    <div className="mt-2 mb-5">
      <h2>Ratings for the Past Week</h2>
      <div className="chart-wrapper">
        {Object.keys(dataChart).length > 0 ? (
          <Doughnut data={dataChart} />
        ) : (
          <p>Loading...</p>
        )}
        {averageRating !== null && <p>Average Rating: {averageRating}</p>}
      </div>
    </div>
  );
}

export default AverageRatingPastWeek;
