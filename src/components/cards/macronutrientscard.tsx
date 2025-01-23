import { NutritionEntry } from "../../store";
import BarChart from "../charts/BarChart";
import "../homepage/homePage.css";

interface MacronutrientsCardProps {
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
}

const MacronutrientsCard = ({
  protein,
  carbohydrates,
  fats,
}: MacronutrientsCardProps) => {
  const proteinTotal = protein.reduce((sum, entry) => sum + entry.value, 0);
  const carbsTotal = carbohydrates.reduce((sum, entry) => sum + entry.value, 0);
  const fatsTotal = fats.reduce((sum, entry) => sum + entry.value, 0);

  const chartData = {
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
    <div className="card small-card">
      <div className="centered-content">
        <h2 className="section-title">Macronutrients</h2>
        <BarChart
          datasets={chartData.datasets}
          labels={["Macronutrients"]}
          title="Daily Macronutrients"
          yAxisLabel="Grams"
        />
      </div>
    </div>
  );
};

export default MacronutrientsCard;
