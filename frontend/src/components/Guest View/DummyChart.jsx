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

function DummyChart() {
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
  const dataChart = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Hours of Sleep",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [6, 7, 6.5, 7.5, 6.8],
      },
      {
        backgroundColor: ["#FF5733", "#FFC300", "#C70039", "#900C3F"],
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataLine = {
    labels: labels,
    datasets: [
      {
        label: "Hours of Sleep",
        data: labels.map(() =>
          faker.datatype.float({ min: 5, max: 12, precision: 1 })
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Doughnut data={dataChart} />
      </div>
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Line data={dataLine} />
      </div>
    </div>
  );
}

export default DummyChart;
