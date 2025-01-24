import { useState } from "react";
import PieChartCard from "../charts/Chart";
import DialogBox from "../dialogbox/dialogBox";
import HistoryBox from "../dialogbox/historybox";
import "../homepage/homePage.css";
import "./caloriecard.css";

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
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="card large-card">
      <div className="centered-content">
        <h2 className="section-title">Calorie intake</h2>
        {calorieTarget !== 0 ? (
          <>
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
                <button
                  className="history-btn"
                  onClick={() => setShowHistory(true)}
                >
                  Show History
                </button>
              </div>
            </div>

            <HistoryBox
              isOpen={showHistory}
              onClose={() => setShowHistory(false)}
            />
          </>
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
