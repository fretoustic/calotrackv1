import PieChartCard from "../charts/Chart";
import DialogBox from "../dialogbox/dialogBox";
import "../homepage/homePage.css";
interface CalorieCardProps {
  calorieTarget: number;
  calorieConsumed: number;
  setIsCalorieDialogOpen: (isOpen: boolean) => void;
}
const CalorieCard = ({
  calorieTarget,
  calorieConsumed,
  setIsCalorieDialogOpen,
}: CalorieCardProps) => {
  return (
    <div className="card large-card">
      <div className="centered-content">
        <h2 className="section-title">Calorie intake</h2>
        {calorieTarget !== 0 ? (
          <div className="chart-container">
            <PieChartCard
              target={calorieTarget}
              consumed={calorieConsumed}
              unit="Kcal"
            />
            <div className="calorie-stats">
              <p>Target: {calorieTarget} KCal</p>
              <p>Consumed: {calorieConsumed} KCal</p>
              <button
                className="add-calorie-btn"
                onClick={() => setIsCalorieDialogOpen(true)}
              >
                Add Calorie Intake
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>Want to set your calorie targets?</p>
            <DialogBox type="calorie" />
          </>
        )}
      </div>
    </div>
  );
};

export default CalorieCard;
