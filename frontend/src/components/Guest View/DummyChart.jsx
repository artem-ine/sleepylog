import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

function DummyChart() {
  ChartJS.register(ArcElement, Tooltip, Legend);
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

  ChartJS.register(ArcElement, Tooltip, Legend);
  const secondDataChart = {
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

  return (
    <div className="flex flex-col items-center lg:flex-row lg:space-x-6">
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Doughnut data={dataChart} />
      </div>
      <div className="mb-4 lg:mb-0 dummy-chart-wrapper">
        <Doughnut data={secondDataChart} />
      </div>
    </div>
  );
}

export default DummyChart;
