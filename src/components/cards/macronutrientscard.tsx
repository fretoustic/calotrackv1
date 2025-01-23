import { NutritionEntry } from "../../store";
import MacronutrientBarChart from "../charts/BarChart";
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
  return (
    <div className="card small-card">
      <div className="centered-content">
        <h2 className="section-title">Macronutrients</h2>
        <MacronutrientBarChart
          protein={protein}
          carbohydrates={carbohydrates}
          fats={fats}
        />
      </div>
    </div>
  );
};

export default MacronutrientsCard;
