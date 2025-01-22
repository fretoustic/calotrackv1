import {
  useCalorieConsumedStore,
  useCalorieTargetStore,
  useCustomGoalConsumedStore,
  useCustomGoalStore,
  useCustomGoalTargetStore,
  useWaterConsumedStore,
  useWaterTargetStore,
  useMacronutrientsStore,
  useUserProfileStore,
} from "./store";
import NavBar from "./components/NavBar";
import PieChartCard from "./components/Chart";
import "./homePage.css";
import DialogBox from "./components/dialogBox";
import { FaPlus, FaMinus } from "react-icons/fa";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useSearchApi } from "./hooks/useSearchApi";
import MacronutrientBarChart from "./components/BarChart";
import { useThemeStore } from "./store";

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
  const {
    protein,
    increaseProtein,
    carbohydrates,
    increaseCarbohydrates,
    fats,
    increaseFats,
  } = useMacronutrientsStore();
  const { isDarkMode } = useThemeStore();
  const { weightKg, setWeightKg } = useUserProfileStore();

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

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  return (
    <div
      className="home-container"
      style={{
        backgroundColor: isDarkMode ? "#1A202C" : "white",
        minHeight: "100vh",
      }}
    >
      {showConfetti && <Confetti />}
      {showMessage && (
        <div className="achievement-popup">
          You are one step closer to a better self!
        </div>
      )}
      <div className="nav-section">
        <NavBar />
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
                          <span className="amount">
                            <p>0.25L</p>
                          </span>
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

                              {data && data.items ? (
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
                                              const timestamp =
                                                new Date().toISOString();
                                              increaseCalorieConsumed({
                                                value: item.calories,
                                                timestamp: timestamp,
                                              });
                                              increaseProtein({
                                                value: item.protein_g,
                                                timestamp: timestamp,
                                              });
                                              increaseCarbohydrates({
                                                value:
                                                  item.carbohydrates_total_g,
                                                timestamp: timestamp,
                                              });
                                              increaseFats({
                                                value: item.fat_total_g,
                                                timestamp: timestamp,
                                              });
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
                                                const protein =
                                                  prompt("Enter protein (g):");
                                                const carbs = prompt(
                                                  "Enter carbohydrates (g):"
                                                );
                                                const fats =
                                                  prompt("Enter fats (g):");
                                                const timestamp =
                                                  new Date().toISOString();

                                                increaseCalorieConsumed({
                                                  value: Number(calories),
                                                  timestamp: timestamp,
                                                });
                                                if (
                                                  protein &&
                                                  !isNaN(Number(protein))
                                                ) {
                                                  increaseProtein({
                                                    value: Number(protein),
                                                    timestamp: timestamp,
                                                  });
                                                }
                                                if (
                                                  carbs &&
                                                  !isNaN(Number(carbs))
                                                ) {
                                                  increaseCarbohydrates({
                                                    value: Number(carbs),
                                                    timestamp: timestamp,
                                                  });
                                                }
                                                if (
                                                  fats &&
                                                  !isNaN(Number(fats))
                                                ) {
                                                  increaseFats({
                                                    value: Number(fats),
                                                    timestamp: timestamp,
                                                  });
                                                }
                                                setIsCalorieDialogOpen(false);
                                              }
                                            }}
                                            className="add-btn"
                                          >
                                            Add Entry Manually
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              ) : (
                                <div className="no-results">
                                  <p>No results found.</p>
                                  <button
                                    onClick={() => {
                                      const calories = prompt(
                                        "Enter calories manually:"
                                      );
                                      if (
                                        calories &&
                                        !isNaN(Number(calories))
                                      ) {
                                        const protein =
                                          prompt("Enter protein (g):");
                                        const carbs = prompt(
                                          "Enter carbohydrates (g):"
                                        );
                                        const fats = prompt("Enter fats (g):");

                                        increaseCalorieConsumed({
                                          value: Number(calories),
                                          timestamp: new Date().toISOString(),
                                        });
                                        if (
                                          protein &&
                                          !isNaN(Number(protein))
                                        ) {
                                          increaseProtein({
                                            value: Number(protein),
                                            timestamp: new Date().toISOString(),
                                          });
                                        }
                                        if (carbs && !isNaN(Number(carbs))) {
                                          increaseCarbohydrates({
                                            value: Number(carbs),
                                            timestamp: new Date().toISOString(),
                                          });
                                        }
                                        if (fats && !isNaN(Number(fats))) {
                                          increaseFats({
                                            value: Number(fats),
                                            timestamp: new Date().toISOString(),
                                          });
                                        }
                                        setIsCalorieDialogOpen(false);
                                      }
                                    }}
                                    className="manual-btn"
                                  >
                                    Add Entry Manually
                                  </button>
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
              <div className="card small-card">
                <div className="centered-content">
                  <h2 className="section-title">Macronutrients</h2>
                  <MacronutrientBarChart
                    protein={protein}
                    carbohydrates={carbohydrates}
                    fats={fats}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-row">
            <div className="cards-row">
              <div className="card small-card">
                <div className="centered-content">
                  <h2 className="section-title">Weight Tracker</h2>
                  <div className="weight-tracker">
                    <p>Current Weight: {weightKg} kg</p>
                    <button
                      style={{
                        padding: "12px 24px",
                        fontSize: "16px",
                        fontWeight: "500",
                        border: "none",
                        borderRadius: "8px",
                        backgroundColor: "var(--button-primary-bg)",
                        color: "var(--button-primary-text)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        userSelect: "none",
                      }}
                      onClick={() => {
                        const newWeight = prompt(
                          "Enter your current weight (kg):"
                        );
                        if (newWeight && !isNaN(Number(newWeight))) {
                          setWeightKg(Number(newWeight));
                        }
                      }}
                    >
                      Update Weight
                    </button>
                  </div>
                </div>
              </div>
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
