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
import { useThemeStore } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MacroEntry {
  value: number;
  timestamp: string;
}

interface DailyMacrosChartProps {
  protein: MacroEntry[];
  carbohydrates: MacroEntry[];
  fats: MacroEntry[];
}

const DailyMacrosChart: React.FC<DailyMacrosChartProps> = ({
  protein,
  carbohydrates,
  fats,
}) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? '#fff' : '#000';

  const today = new Date().toISOString().split("T")[0];

  // Filter entries for today only
  const todayProtein = protein.filter((entry) =>
    entry.timestamp.startsWith(today)
  );
  const todayCarbs = carbohydrates.filter((entry) =>
    entry.timestamp.startsWith(today)
  );
  const todayFats = fats.filter((entry) => entry.timestamp.startsWith(today));

  // Generate hourly labels (00:00 to 23:00)
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  // Accumulate values by hour
  const getAccumulatedValues = (entries: MacroEntry[]) => {
    const hourlyValues = new Array(24).fill(0);
    let accumulator = 0;

    entries.forEach((entry) => {
      const hour = new Date(entry.timestamp).getHours();
      accumulator += entry.value;
      for (let i = hour; i < 24; i++) {
        hourlyValues[i] = accumulator;
      }
    });

    return hourlyValues;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 10,
          },
          color: textColor,
        },
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
        beginAtZero: true,
        min: 0,
        ticks: {
          font: {
            size: 10,
          },
          color: textColor,
        },
      },
      x: {
        title: {
          display: false,
        },
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
          maxRotation: 45,
          minRotation: 45,
          color: textColor,
        },
      },
    },
    elements: {
      point: {
        radius: 2,
      },
      line: {
        tension: 0.3,
      },
    },
  };

  const data = {
    labels: hours,
    datasets: [
      {
        label: "Protein (g)",
        data: getAccumulatedValues(todayProtein),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Carbs (g)",
        data: getAccumulatedValues(todayCarbs),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Fats (g)",
        data: getAccumulatedValues(todayFats),
        borderColor: "rgb(255, 206, 86)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default DailyMacrosChart;
