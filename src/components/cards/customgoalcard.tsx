import { useCustomGoalsStore } from "../../store";
import PieChartCard from "../charts/Chart";
import CustomDialog from "../dialogbox/CustomDialog";
import "../homepage/homePage.css";
import { useState } from "react";

const CustomGoalCard = () => {
  const { goals, setConsumed, addGoal, updateGoal } = useCustomGoalsStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const customGoal = goals[currentIndex]?.name || "";
  const customGoalTarget = goals[currentIndex]?.target || 0;
  const customGoalConsumed = goals[currentIndex]?.consumed || 0;

  const handleSetTarget = () => {
    const amount = prompt(`Enter target ${customGoal} amount:`);
    if (amount && !isNaN(Number(amount))) {
      updateGoal(goals[currentIndex]?.id, { target: Number(amount) });
    }
  };

  return (
    <div className="card large-card">
      <div className="centered-content">
        {goals.length === 0 ? (
          <>
            <h2 className="section-title">Custom Goals</h2>
            <div style={{ marginTop: "auto" }}>
              <CustomDialog
                title="Add Custom Goal"
                fields={[
                  { label: "Goal Name", type: "text", id: "name" },
                  { label: "Target Amount", type: "number", id: "target" },
                  { label: "Unit", type: "text", id: "unit" },
                ]}
                onSubmit={(values) => {
                  if (values.name && !isNaN(Number(values.target))) {
                    const newId =
                      goals.length > 0 ? goals[goals.length - 1].id + 1 : 1;
                    addGoal(
                      values.name as string,
                      Number(values.target),
                      newId,
                      values.unit as string
                    );
                  }
                }}
                triggerButton={
                  <button className="add-calorie-btn">Add Custom Goal</button>
                }
              />
            </div>
          </>
        ) : customGoalTarget !== 0 ? (
          <>
            <button
              className="nav-button top"
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
            >
              ↑
            </button>
            <h2 className="section-title">{customGoal} Target</h2>
            <div className="chart-container">
              <PieChartCard
                target={customGoalTarget}
                consumed={customGoalConsumed}
                unit={goals[currentIndex]?.unit || customGoal}
              />
              <div className="custom-goal-stats">
                <p>
                  Target: {customGoalTarget}{" "}
                  {goals[currentIndex]?.unit || customGoal}
                </p>
                <p>
                  Consumed: {customGoalConsumed}{" "}
                  {goals[currentIndex]?.unit || customGoal}
                </p>
                <button
                  className="add-calorie-btn"
                  onClick={() => {
                    const amount = prompt(`Enter ${customGoal} amount:`);
                    if (amount && !isNaN(Number(amount))) {
                      setConsumed(goals[currentIndex]?.id, Number(amount));
                    }
                  }}
                >
                  Add {customGoal}
                </button>
              </div>
            </div>
            <button
              className="nav-button bottom"
              onClick={() => {
                if (currentIndex === goals.length - 1) {
                  if (window.confirm("Do you want to add a new custom goal?")) {
                    const name = prompt("Enter new goal name:");
                    const target = prompt("Enter target amount:");
                    const unit = prompt(`Enter unit of ${name}:`);
                    if (name && target && !isNaN(Number(target)) && unit) {
                      const newId =
                        goals.length > 0 ? goals[goals.length - 1].id + 1 : 1;
                      addGoal(name, Number(target), newId, unit);
                      setCurrentIndex(goals.length);
                    }
                  }
                } else {
                  setCurrentIndex((prev) =>
                    Math.min(goals.length - 1, prev + 1)
                  );
                }
              }}
            >
              ↓
            </button>
          </>
        ) : (
          <>
            <h2 className="section-title">{customGoal} Target not set</h2>
            <button className="add-custom-btn" onClick={handleSetTarget}>
              Set {customGoal} Target
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomGoalCard;
