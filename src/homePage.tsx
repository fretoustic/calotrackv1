import {
  useCalorieConsumedStore,
  useCalorieTargetStore,
  useCustomGoalConsumedStore,
  useCustomGoalStore,
  useCustomGoalTargetStore,
  useWaterConsumedStore,
  useWaterTargetStore,
} from "./store";
import NavBar from "./components/NavBar";
import PieChartCard from "./components/Chart";
import "./homePage.css";
import DialogBox from "./components/dialogBox";
import { FaPlus, FaMinus } from "react-icons/fa";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useSearchApi } from "./hooks/useSearchApi";

const HomePage = () => {
  const { waterTarget } = useWaterTargetStore();
  const { waterConsumed, increaseConsumed, decreaseConsumed } =
    useWaterConsumedStore();

  const { calorieTarget } = useCalorieTargetStore();
  const { calorieConsumed, increaseCalorieConsumed } =
    useCalorieConsumedStore();
  const { customGoal, setCustomGoal } = useCustomGoalStore();
  const { customGoalTarget, setCustomGoalTarget } = useCustomGoalTargetStore();
  const { customGoalConsumed, setCustomGoalConsumed } =
    useCustomGoalConsumedStore();
  const handleIncrease = () => {
    if (waterConsumed < waterTarget) {
      increaseConsumed(0.25);
    }
  };

  const handleDecrease = () => {
    if (waterConsumed >= 0.25) {
      decreaseConsumed(0.25);
    }
  };

  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isCalorieDialogOpen, setIsCalorieDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, error, data, handleSearch } = useSearchApi({ searchTerm });

  useEffect(() => {
    if (waterConsumed === waterTarget && waterTarget !== 0) {
      setShowConfetti(true);
      setShowMessage(true);
      // Hide confetti and message after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [waterConsumed, waterTarget]);

  return (
    <div className="home-container">
      {showConfetti && <Confetti />}
      {showMessage && (
        <div className="achievement-popup">
          You are one step closer to a better self!
        </div>
      )}
      <div className="nav-section">
        <NavBar name={"harsh"} />
      </div>
      <div className="main-section">
        <div className="content-wrapper">
          <div className="full-width">
            <div className="cards-row">
              <div className="card large-card ">
                <div className="centered-content">
                  <h2 className="section-title">Water levels</h2>
                  {waterTarget !== 0 ? (
                    <div className="chart-container">
                      <PieChartCard
                        target={waterTarget}
                        consumed={waterConsumed}
                        unit="L"
                      />
                      <div className="water-stats">
                        <p>Target: {waterTarget} Litres</p>
                        <p>Consumed: {waterConsumed} Litres</p>
                        <p>Consumed some water? Let us know how much!</p>
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
              <div className="card large-card ">
                <div className="centered-content">
                  <h2 className="section-title">Calorie intake</h2>
                  {calorieTarget !== 0 ? (
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

                        {isCalorieDialogOpen && (
                          <dialog open className="calorie-dialog">
                            <div className="dialog-content">
                              <h3>Add Calorie Intake</h3>
                              <div className="search-section">
                                <input
                                  type="text"
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  placeholder="What did you eat?"
                                  className="search-input"
                                />
                                <button
                                  onClick={handleSearch}
                                  disabled={isLoading}
                                  className="search-btn"
                                >
                                  Search
                                </button>
                              </div>

                              {isLoading && <p>Searching...</p>}
                              {error && (
                                <p className="error-message">{error}</p>
                              )}

                              {data && data.items && (
                                <div className="search-results">
                                  <h4>Results:</h4>
                                  {data.items.map(
                                    (item: any, index: number) => (
                                      <div key={index} className="food-item">
                                        <p>{item.name}</p>
                                        <p>Calories: {item.calories}</p>
                                        <p>
                                          Serving size: {item.serving_size_g}g
                                        </p>
                                        <div className="calorie-actions">
                                          <button
                                            onClick={() => {
                                              increaseCalorieConsumed(
                                                item.calories
                                              );
                                              setIsCalorieDialogOpen(false);
                                            }}
                                            className="add-btn"
                                          >
                                            Add this?
                                          </button>
                                          <button
                                            onClick={() => {
                                              const calories = prompt(
                                                "Enter calories manually:"
                                              );
                                              if (
                                                calories &&
                                                !isNaN(Number(calories))
                                              ) {
                                                increaseCalorieConsumed(
                                                  Number(calories)
                                                );
                                                setIsCalorieDialogOpen(false);
                                              }
                                            }}
                                            className="manual-btn"
                                          >
                                            Add manually
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                              <div className="dialog-actions">
                                <button
                                  onClick={() => setIsCalorieDialogOpen(false)}
                                  className="close-btn"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </dialog>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>Want to set your calorie targets?</p>
                      <DialogBox type="calorie" />
                    </>
                  )}
                </div>
              </div>
              <div className="card small-card"></div>
            </div>
          </div>
          <div className="bottom-row">
            <div className="cards-row">
              <div className="card small-card"></div>
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
                              const amount = prompt(
                                `Enter ${customGoal} amount:`
                              );
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
                      <h2 className="section-title">
                        {customGoal} Target not set
                      </h2>
                      <DialogBox type={customGoal} />
                    </>
                  )}
                </div>
              </div>
              <div className="card large-card"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
