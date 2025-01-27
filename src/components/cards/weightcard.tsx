import { NutritionEntry } from "../../store";
import WeightChart from "../charts/WeightChart";
import "../homepage/homePage.css";
interface WeightCardProps {
  weightKg: number;
  targetWeight: number;
  weights: NutritionEntry[];
  setTargetWeight: (newTargetWeight: number) => void;
  setWeightKg: (newWeightKg: number) => void;
  addWeightEntry: (newWeightEntry: NutritionEntry) => void;
}
const WeightCard = ({
  weightKg,
  targetWeight,
  weights,
  setTargetWeight,
  setWeightKg,
  addWeightEntry,
}: WeightCardProps) => {
  return (
    <div className="card small-card">
      <div className="centered-content">
        <h2 className="section-title" style={{ marginBottom: "4px" }}>
          Weight Tracker
        </h2>
        <div
          className="weight-tracker"
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <p style={{ margin: 0 }}>Current Weight: {weightKg} kg</p>
          {targetWeight > 0 ? (
            <>
              <p style={{ margin: 0 }}>Target Weight: {targetWeight} kg</p>
              {weights.length > 0 && (
                <div style={{ width: "100%", height: "200px" }}>
                  <WeightChart weights={weights} />
                </div>
              )}
              <button
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "500",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "var(--button-primary-bg)",
                  color: "var(--button-primary-text)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const newWeight = prompt("Enter your current weight (kg):");
                  if (newWeight && !isNaN(Number(newWeight))) {
                    setWeightKg(Number(newWeight));
                    addWeightEntry({
                      value: Number(newWeight),
                      timestamp: new Date().toISOString(),
                    });
                  }
                }}
              >
                Enter Weight Entry
              </button>
            </>
          ) : (
            <>
              {weights.length > 0 && (
                <div style={{ width: "100%", height: "200px" }}>
                  <WeightChart weights={weights} />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <button
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "var(--button-primary-bg)",
                    color: "var(--button-primary-text)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const target = prompt("Enter your target weight (kg):");
                    if (target && !isNaN(Number(target))) {
                      setTargetWeight(Number(target));
                    }
                  }}
                >
                  Set Target Weight
                </button>
                <button
                  style={{
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "var(--button-primary-bg)",
                    color: "var(--button-primary-text)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const newWeight = prompt("Enter your current weight (kg):");
                    if (newWeight && !isNaN(Number(newWeight))) {
                      setWeightKg(Number(newWeight));
                      addWeightEntry({
                        value: Number(newWeight),
                        timestamp: new Date().toISOString(),
                      });
                    }
                  }}
                >
                  Enter Weight Entry
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightCard;
