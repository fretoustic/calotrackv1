interface CalorieBoxProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  inputText: string;
  setInputText: (inputText: string) => void;
  handleCalorieSubmit: () => void;
  handleClose: () => void;
  weightKg: number;
  heightCm: number;
}

export const CalorieBox = ({
  isOpen,
  setIsOpen,
  inputText,
  setInputText,
  handleCalorieSubmit,
  handleClose,
  weightKg,
  heightCm,
}: CalorieBoxProps) => {
  return (
    <div>
      <button className="setup-button" onClick={() => setIsOpen(true)}>
        Set Calorie Target
      </button>

      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h2>Calorie Target</h2>
            <p>
              Recommended based on your height and weight :
              {Math.round((10 * weightKg + 6.25 * heightCm - 5 * 25 + 5) * 1.2)}{" "}
              kcal
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
};

export default CalorieBox;
