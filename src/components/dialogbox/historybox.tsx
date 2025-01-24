import { useCalorieConsumedStore, useMacronutrientsStore } from "../../store";
import "./DialogBox.css";

interface HistoryBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const HistoryBox = ({ isOpen, onClose }: HistoryBoxProps) => {
  const { calorieHistory, deleteFromCalorieHistory } =
    useCalorieConsumedStore();
  const {
    protein,
    carbohydrates,
    fats,
    deleteProtein,
    deleteCarbohydrates,
    deleteFats,
  } = useMacronutrientsStore();

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h2>Nutrition History</h2>
        <div className="history-list">
          {calorieHistory.map((entry, index) => (
            <div key={entry.timestamp} className="history-item">
              <div>
                <p>Calories: {entry.value}</p>
                <p>Protein: {protein[index]?.value || 0}g</p>
                <p>Carbs: {carbohydrates[index]?.value || 0}g</p>
                <p>Fats: {fats[index]?.value || 0}g</p>
                <p>Time: {new Date(entry.timestamp).toLocaleString()}</p>
              </div>
              <button
                onClick={() => {
                  deleteFromCalorieHistory(entry.timestamp);
                  deleteProtein(entry.timestamp);
                  deleteCarbohydrates(entry.timestamp);
                  deleteFats(entry.timestamp);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HistoryBox;
