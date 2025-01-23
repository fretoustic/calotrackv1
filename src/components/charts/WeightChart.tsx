import React from "react";
import "../homepage/homePage.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeightChartProps {
  weights: { value: number; timestamp: string }[];
}

const WeightChart: React.FC<WeightChartProps> = ({ weights }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      x: {
        title: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    elements: {
      point: {
        radius: 3,
      },
      line: {
        tension: 0.3,
      },
    },
  };

  // Sort weights by timestamp and format dates
  const sortedWeights = [...weights].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const data = {
    labels: sortedWeights.map((entry) =>
      new Date(entry.timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "Weight",
        data: sortedWeights.map((entry) => entry.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "150px", width: "100%" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default WeightChart;
