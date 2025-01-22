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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface NutritionEntry {
  value: number;
}

interface MacronutrientBarChartProps {
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
}

const MacronutrientBarChart: React.FC<MacronutrientBarChartProps> = ({
  protein,
  carbohydrates,
  fats,
}) => {
  // Sum up the values from each array
  const proteinTotal = protein.reduce((sum, entry) => sum + entry.value, 0);
  const carbsTotal = carbohydrates.reduce((sum, entry) => sum + entry.value, 0);
  const fatsTotal = fats.reduce((sum, entry) => sum + entry.value, 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Macronutrients",
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
          display: true,
          text: "Grams",
        },
      },
    },
  };

  const data = {
    labels: ["Macronutrients"],
    datasets: [
      {
        label: "Protein",
        data: [proteinTotal],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 1,
      },
      {
        label: "Carbohydrates",
        data: [carbsTotal],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderWidth: 1,
      },
      {
        label: "Fats",
        data: [fatsTotal],
        backgroundColor: "rgba(255, 206, 86, 0.7)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default MacronutrientBarChart;
