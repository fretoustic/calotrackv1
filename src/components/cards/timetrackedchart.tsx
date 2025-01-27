import { NutritionEntry } from "../../store";
import DailyMacrosChart from "../charts/DailyMacrosChart";
import "../homepage/homePage.css";
interface TimeTrackedChartProps {
  protein: NutritionEntry[];
  carbohydrates: NutritionEntry[];
  fats: NutritionEntry[];
}
const TimeTrackedChart = ({
  protein,
  carbohydrates,
  fats,
}: TimeTrackedChartProps) => {
  return (
    <div className="card large-card">
      <div className="centered-content" style={{width: "90%", height: "90%"}}>
        <h2 className="section-title">Daily Macronutrient Progress</h2>
        <DailyMacrosChart
          protein={protein}
          carbohydrates={carbohydrates}
          fats={fats}
        />
      </div>
    </div>
  );
};

export default TimeTrackedChart;
