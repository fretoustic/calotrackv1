import PieChartCard from "../charts/Chart";
import DialogBox from "../dialogbox/dialogBox";
import "../homepage/homePage.css";
interface CustomGoalCardProps {
  customGoal: string;
  customGoalTarget: number;
  customGoalConsumed: number;
  setCustomGoalConsumed: (newCustomGoalConsumed: number) => void;
}
const CustomGoalCard = ({
  customGoal,
  customGoalTarget,
  customGoalConsumed,
  setCustomGoalConsumed,
}: CustomGoalCardProps) => {
  return (
    <div className="card large-card">
      <div className="centered-content">
        {customGoal === "" ? (
          <>
            <h2 className="section-title">Custom Goals</h2>
            <DialogBox type="custom" />
          </>
        ) : customGoalTarget !== 0 ? (
          <>
            <h2 className="section-title">{customGoal} Target</h2>
            <div className="chart-container">
              <PieChartCard
                target={customGoalTarget}
                consumed={customGoalConsumed}
                unit={customGoal}
              />
              <div className="custom-goal-stats">
                <p>
                  Target: {customGoalTarget} {customGoal}
                </p>
                <p>
                  Consumed: {customGoalConsumed} {customGoal}
                </p>
                <button
                  className="add-custom-btn"
                  onClick={() => {
                    const amount = prompt(`Enter ${customGoal} amount:`);
                    if (amount && !isNaN(Number(amount))) {
                      setCustomGoalConsumed(Number(amount));
                    }
                  }}
                >
                  Add {customGoal}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="section-title">{customGoal} Target not set</h2>
            <DialogBox type={customGoal} />
          </>
        )}
      </div>
    </div>
  );
};

export default CustomGoalCard;
