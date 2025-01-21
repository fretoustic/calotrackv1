import { useState } from "react";
import "./DialogBox.css";
import {
  useCalorieTargetStore,
  useCustomGoalStore,
  useCustomGoalTargetStore,
  useWaterTargetStore,
  useUserProfileStore
} from "../store";

interface DialogBoxProps {
  type: string;
}

const DialogBox = ({ type }: DialogBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { setWaterTarget } = useWaterTargetStore();
  const { setCalorieTarget } = useCalorieTargetStore();
  const { customGoal, setCustomGoal } = useCustomGoalStore();
  const { setCustomGoalTarget } = useCustomGoalTargetStore();
  const {weightKg,heightCm}= useUserProfileStore();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInputText("");
  };

  const handleSubmit = () => {
    setWaterTarget(parseInt(inputText));
    handleClose();
  };
  const handleCalorieSubmit = () => {
    setCalorieTarget(parseInt(inputText));
    handleClose();
  };
  const handleCustomSubmit = () => {
    setCustomGoal(inputText);
    handleClose();
  };
  const handleCustomGoalTargetSubmit = () => {
    setCustomGoalTarget(parseInt(inputText));
    handleClose();
  };

  if (type === "water") {
    return (
      <div>
        <button className="setup-button" onClick={handleOpen}>
          Set Water Target
        </button>

        {isOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>Water Target</h2>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Water target in Litres"
              />
              <div className="dialog-buttons">
                <button onClick={handleSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (type === "calorie") {
    return (
      <div>
        <button className="setup-button" onClick={handleOpen}>
          Set Calorie Target
        </button>

        {isOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>Calorie Target</h2>
              <p>
                Recommended based on your height and weight :
                {Math.round((10 * weightKg + 6.25 * heightCm - 5 * 25 + 5) * 1.2)} kcal
              </p>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Calorie target in kcal"
              />
              <div className="dialog-buttons">
                <button onClick={handleCalorieSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (type === "custom") {
    return (
      <div>
        <button className="setup-button" onClick={handleOpen}>
          Set Custom goals
        </button>

        {isOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>Custom Goals</h2>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="What goal do you want to achieve? (eg: Protien)"
              />
              <div className="dialog-buttons">
                <button onClick={handleCustomSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else if (type === customGoal) {
    return (
      <div>
        <button className="setup-button" onClick={handleOpen}>
          Set Custom goals
        </button>

        {isOpen && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <h2>{customGoal} Target</h2>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`what should be your target for ${customGoal}? (only numbers without units)`}
              />
              <div className="dialog-buttons">
                <button onClick={handleCustomGoalTargetSubmit}>Save</button>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default DialogBox;
