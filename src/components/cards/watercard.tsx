import { FaMinus, FaPlus } from "react-icons/fa";
import PieChartCard from "../charts/Chart";
import DialogBox from "../dialogbox/dialogBox";
import "../homepage/homePage.css";
import { useThemeStore } from "../../store";

interface WaterCardProps {
  waterTarget: number;
  waterConsumed: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const WaterCard = ({
  waterTarget,
  waterConsumed,
  handleDecrease,
  handleIncrease,
}: WaterCardProps) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`card large-card ${isDarkMode ? "dark" : ""}`}>
      <div className="centered-content">
        <h2
          className={`section-title ${isDarkMode ? "text-light" : ""}`}
          style={{ marginTop: "3px" }}
        >
          Water Levels
        </h2>
        {waterTarget !== 0 ? (
          <div className="chart-container">
            <PieChartCard
              target={waterTarget}
              consumed={waterConsumed}
              unit="L"
            />
            <div className={`water-stats ${isDarkMode ? "text-light" : ""}`}>
              <div className="stat-row">
                <p>
                  Target: <span className="stat-value">{waterTarget} L</span>
                </p>
                <p>
                  Consumed:{" "}
                  <span className="stat-value">{waterConsumed} L</span>
                </p>
              </div>
              <p className="stat-prompt" style={{ marginTop: "1px" }}>
                Consumed some water? Let us know how much!
              </p>
              <div className="water-controls" style={{ marginTop: "1px" }}>
                <button
                  onClick={handleDecrease}
                  className={`control-btn ${isDarkMode ? "dark" : ""}`}
                  disabled={waterConsumed < 0.25}
                >
                  <FaMinus />
                </button>
                <span className="amount">0.25L</span>
                <button
                  onClick={handleIncrease}
                  className={`control-btn ${isDarkMode ? "dark" : ""}`}
                  disabled={waterConsumed >= waterTarget}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p className={isDarkMode ? "text-light" : ""}>
              Want to set up your water targets?
            </p>
            <DialogBox type="water" />
          </>
        )}
      </div>
    </div>
  );
};

export default WaterCard;
