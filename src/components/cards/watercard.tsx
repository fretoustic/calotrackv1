import { FaMinus, FaPlus } from "react-icons/fa";
import PieChartCard from "../charts/Chart";
import DialogBox from "../dialogbox/dialogBox";
import "../homepage/homePage.css";
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
  return (
    <div className="card large-card">
      <div className="centered-content">
        <h2 className="section-title">Water Levels</h2>
        {waterTarget !== 0 ? (
          <div className="chart-container">
            <PieChartCard
              target={waterTarget}
              consumed={waterConsumed}
              unit="L"
            />
            <div className="water-stats">
              <div className="stat-row">
                <p>
                  Target:{" "}
                  <span className="stat-value">{waterTarget} Litres</span>
                </p>
                <p>
                  Consumed:{" "}
                  <span className="stat-value">{waterConsumed} Litres</span>
                </p>
              </div>
              <p className="stat-prompt">
                Consumed some water? Let us know how much!
              </p>
              <div className="water-controls">
                <button
                  onClick={handleDecrease}
                  className="control-btn"
                  disabled={waterConsumed < 0.25}
                >
                  <FaMinus />
                </button>
                <span className="amount">0.25L</span>
                <button
                  onClick={handleIncrease}
                  className="control-btn"
                  disabled={waterConsumed >= waterTarget}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <p>Want to set up your water targets?</p>
            <DialogBox type="water" />
          </>
        )}
      </div>
    </div>
  );
};

export default WaterCard;
