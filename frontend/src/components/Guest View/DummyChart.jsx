import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { useState, useEffect } from "react";

function DummyChart() {
  const [doughnutData, setDoughnutData] = useState(getRandomDoughnutData());
  const [lineData, setLineData] = useState(getRandomLineData());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDoughnutData(getRandomDoughnutData());
      setLineData(getRandomLineData());
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomDoughnutData() {
    const labelsPie = ["😫", "😐", "😊", "😄", "😍"];
    const data = labelsPie.map(() => getRandomFloat(1, 5).toFixed(1));

    return {
      labels: labelsPie,
      datasets: [
        {
          label: "Average Rating",
          backgroundColor: [
            "#790119",
            "#CC6600",
            "#E3A92C",
            "#B3B319",
            "#4F8F00",
          ],
          borderColor: "#AFC1D6",
          borderWidth: 1,
          data: data,
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }

  function getRandomLineData() {
    const labelsLine = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const data = labelsLine.map(() => getRandomFloat(1, 12).toFixed(1));

    return {
      labels: labelsLine,
      datasets: [
        {
          label: "Hours of sleep this week",
          data: data,
          borderColor: "#AFC1D6",
          backgroundColor: "#AFC1D6",
        },
      ],
    };
  }

  return (
    <div className="border-2 dark:border-primary border-secondary px-3 rounded-xl py-5 flex items-center">
      <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
        <div className="lg:mb-0 dummy-chart-wrapper flex pb-4">
          <Doughnut data={doughnutData} className="p-4" />
          <div className="flex justify-center">
            A recap of your quality of sleep this week.
          </div>
        </div>
        <div className="m-4 lg:mb-0 dummy-chart-wrapper">
          <Line data={lineData} className="pb-4" />
          <p>This is how many hours you've slept every day of the past week!</p>
        </div>
      </div>
    </div>
  );
}

export default DummyChart;
