import {
  useCalorieConsumedStore,
  useCalorieTargetStore,
  useWaterConsumedStore,
  useWaterTargetStore,
  useMacronutrientsStore,
  useUserProfileStore,
  useWeightStore,
} from "../../store";
import NavBar from "../navbar/NavBar";
import "./homePage.css";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { useSearchApi } from "../../hooks/useSearchApi";
import { useThemeStore } from "../../store";
import WaterCard from "../cards/watercard";
import CalorieCard from "../cards/caloriecard";
import MacronutrientsCard from "../cards/macronutrientscard";
import WeightCard from "../cards/weightcard";
import CustomGoalCard from "../cards/customgoalcard";
import TimeTrackedChart from "../cards/timetrackedchart";

const HomePage = () => {
  const { waterTarget } = useWaterTargetStore();
  const { waterConsumed, increaseConsumed, decreaseConsumed } =
    useWaterConsumedStore();

  const { calorieTarget } = useCalorieTargetStore();
  const { calorieConsumed, increaseCalorieConsumed } =
    useCalorieConsumedStore();
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
  const { weights, targetWeight, addWeightEntry, setTargetWeight } =
    useWeightStore();

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

  const increaseMacros = (calories: number, protein: number, carbs: number, fats: number) => {
    const timestamp = new Date().toISOString();
    increaseCalorieConsumed({ value: calories, timestamp });
    if (protein && !isNaN(Number(protein))) {
      increaseProtein({ value: protein, timestamp });
    }
    if (carbs && !isNaN(Number(carbs))) {
      increaseCarbohydrates({ value: carbs, timestamp });
    }
    if (fats && !isNaN(Number(fats))) {
      increaseFats({ value: fats, timestamp });
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
        backgroundColor: isDarkMode ? "#1A202C" : "#f8fafc",
        backgroundImage: isDarkMode
          ? 'url("src/assets/dark_background.png")'
          : 'url("src/assets/backdrop.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {showConfetti && <Confetti />}
      {showMessage && (
        <div className="achievement-popup">
          You are one step closer to a better self!
        </div>
      )}

      {isCalorieDialogOpen && (
        <dialog open className="calorie-dialog">
          <div className="dialog-content">
            <h3>Add Calorie Intake</h3>
            <div className="search-section">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            {error && <p className="error-message">{error}</p>}

            {data && data.items ? (
              <div className="search-results">
                <h4>Results:</h4>
                {data.items.map((item: any, index: number) => (
                  <div key={index} className="food-item">
                    <p>{item.name}</p>
                    <p>Calories: {item.calories}</p>
                    <p>Serving size: {item.serving_size_g}g</p>
                    <div className="calorie-actions">
                      <button
                        onClick={() => {
                          increaseMacros(
                            item.calories,
                            item.protein_g,
                            item.carbohydrates_total_g,
                            item.fat_total_g
                          );
                          setIsCalorieDialogOpen(false);
                        }}
                        className="add-btn"
                      >
                        Add this?
                      </button>
                      <button
                        onClick={() => {
                          const calories = prompt("Enter calories manually:");
                          if (calories && !isNaN(Number(calories))) {
                            const protein = prompt("Enter protein (g):");
                            const carbs = prompt("Enter carbohydrates (g):");
                            const fats = prompt("Enter fats (g):");
                            
                            increaseMacros(
                              Number(calories),
                              Number(protein),
                              Number(carbs),
                              Number(fats)
                            );
                            setIsCalorieDialogOpen(false);
                          }
                        }}
                        className="add-btn"
                      >
                        Add Entry Manually
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No results found.</p>
                <button
                  onClick={() => {
                    const calories = prompt("Enter calories manually:");
                    if (calories && !isNaN(Number(calories))) {
                      const protein = prompt("Enter protein (g):");
                      const carbs = prompt("Enter carbohydrates (g):");
                      const fats = prompt("Enter fats (g):");

                      increaseMacros(
                        Number(calories),
                        Number(protein),
                        Number(carbs),
                        Number(fats)
                      );
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
                className="modern-button"
                onClick={() => setIsCalorieDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <div className="nav-section">
        <NavBar />
      </div>
      <div className="main-section">
        <div className="content-wrapper">
          <div className="full-width">
            <div className="cards-row">
              <WaterCard
                waterTarget={waterTarget}
                waterConsumed={waterConsumed}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
              />
              <CalorieCard
                calorieTarget={calorieTarget}
                calorieConsumed={calorieConsumed}
                setIsCalorieDialogOpen={setIsCalorieDialogOpen}
              />
              <MacronutrientsCard
                protein={protein}
                carbohydrates={carbohydrates}
                fats={fats}
              />
            </div>
          </div>
          <div className="bottom-row">
            <div className="cards-row">
              <WeightCard
                weightKg={weightKg}
                targetWeight={targetWeight}
                weights={weights}
                setTargetWeight={setTargetWeight}
                setWeightKg={setWeightKg}
                addWeightEntry={addWeightEntry}
              />
              <CustomGoalCard />
              <TimeTrackedChart
                protein={protein}
                carbohydrates={carbohydrates}
                fats={fats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
