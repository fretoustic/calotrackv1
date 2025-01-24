import { useState } from 'react';
import { NutritionEntry } from "../../store";
import BarChart from "../charts/BarChart";
import "../homepage/homePage.css";

interface NutrientsCardProps {
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
  sugar: NutritionEntry[];
  fiber: NutritionEntry[];
  sodium: NutritionEntry[];
  potassium: NutritionEntry[];
  cholesterol: NutritionEntry[];
}

const NutrientsCard = ({
  protein,
  carbohydrates,
  fats,
  sugar,
  fiber,
  sodium,
  potassium,
  cholesterol,
}: NutrientsCardProps) => {
  const [showMicronutrients, setShowMicronutrients] = useState(false);

  const proteinTotal = protein.reduce((sum, entry) => sum + entry.value, 0);
  const carbsTotal = carbohydrates.reduce((sum, entry) => sum + entry.value, 0);
  const fatsTotal = fats.reduce((sum, entry) => sum + entry.value, 0);

  const sugarTotal = sugar.reduce((sum, entry) => sum + entry.value, 0);
  const fiberTotal = fiber.reduce((sum, entry) => sum + entry.value, 0);
  const sodiumTotal = sodium.reduce((sum, entry) => sum + entry.value, 0);
  const potassiumTotal = potassium.reduce((sum, entry) => sum + entry.value, 0);
  const cholesterolTotal = cholesterol.reduce((sum, entry) => sum + entry.value, 0);

  const macroData = {
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

  const microData = {
    datasets: [
      {
        label: "Sugar (g)",
        data: [sugarTotal],
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Fiber (g)",
        data: [fiberTotal],
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
      {
        label: "Sodium (mg)",
        data: [sodiumTotal],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Potassium (mg)",
        data: [potassiumTotal],
        backgroundColor: "rgba(255, 206, 86, 0.7)",
      },
      {
        label: "Cholesterol (mg)",
        data: [cholesterolTotal],
        backgroundColor: "rgba(153, 102, 255, 0.7)",
      },
    ],
  };

  return (
    <div className="card small-card">
      <div className="centered-content">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <h2 className="section-title">
            {showMicronutrients ? 'Micronutrients' : 'Macronutrients'}
          </h2>
          <button
            onClick={() => setShowMicronutrients(!showMicronutrients)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ↔️
          </button>
        </div>
        <BarChart
          datasets={showMicronutrients ? microData.datasets : macroData.datasets}
          labels={[showMicronutrients ? "Micronutrients" : "Macronutrients"]}
          title={showMicronutrients ? "Daily Micronutrients" : "Daily Macronutrients"}
          yAxisLabel={showMicronutrients ? "Amount" : "Grams"}
        />
      </div>
    </div>
  );
};

export default NutrientsCard;
