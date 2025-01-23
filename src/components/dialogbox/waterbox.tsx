interface WaterBoxProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  inputText: string;
  setInputText: (inputText: string) => void;
  handleSubmit: () => void;
  handleClose: () => void;
}
export const WaterBox = ({
  isOpen,
  setIsOpen,
  inputText,
  setInputText,
  handleSubmit,
  handleClose,
}: WaterBoxProps) => {
  return (
    <div>
      <button className="setup-button" onClick={() => setIsOpen(true)}>
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
};
