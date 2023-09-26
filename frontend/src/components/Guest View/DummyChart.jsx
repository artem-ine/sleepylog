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
import faker from "faker";
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

  function getRandomDoughnutData() {
    const labelsPie = ["horrible", "mediocre", "OK", "good", "perfect"];
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
          hoverBackgroundColor: "rgba(75,192,192,0.4)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: labelsPie.map(() =>
            faker.datatype.float({ min: 1, max: 5, precision: 1 })
          ),
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
    return {
      labels: labelsLine,
      datasets: [
        {
          label: "Hours of sleep this week",
          data: labelsLine.map(() =>
            faker.datatype.float({ min: 5, max: 12, precision: 1 })
          ),
          borderColor: "#AFC1D6",
          backgroundColor: "#AFC1D6",
        },
      ],
      options: {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    };
  }

  return (
    <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Doughnut data={doughnutData} />
      </div>
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Line data={lineData} />
      </div>
    </div>
  );
}

export default DummyChart;
