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
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          family: "'Arial', sans-serif",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
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
