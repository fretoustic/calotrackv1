import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../homepage/homePage.css";
import { useThemeStore } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth?: number;
  }[];
  labels: string[];
  title: string;
  yAxisLabel?: string;
}

const BarChart: React.FC<BarChartProps> = ({ datasets, labels, title, yAxisLabel = "" }) => {
  const { isDarkMode } = useThemeStore();
  const textColor = isDarkMode ? '#fff' : '#000';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          family: "'Arial', sans-serif",
        },
        color: textColor,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
