import { useNavigate } from "react-router-dom";
import { useUserProfileStore, useWeightStore } from "../../store";
import { useState } from "react";
import "./signup.css";
import image from "../../assets/backdrop.png";
const SignUp3 = () => {
  const navigate = useNavigate();
  const { weightKg, heightCm, setWeightKg, setHeightCm } =
    useUserProfileStore();
  const { addWeightEntry } = useWeightStore();
  const [errors, setErrors] = useState({ weight: false, height: false });
  const validateAndNavigate = () => {
    const newErrors = {
      weight: !weightKg || weightKg <= 0,
      height: !heightCm || heightCm <= 0,
    };

    setErrors(newErrors);

    if (!newErrors.weight && !newErrors.height) {
      addWeightEntry({
        value: weightKg,
        timestamp: new Date().toISOString(),
      });
      navigate("/homepage");
    }
  };
  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="content-container">
        <h2 className="title">Some more details for us to help you!</h2>

        <div className="input-container">
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter your weight"
              className={`input-field ${errors.weight ? "error" : ""}`}
              value={weightKg || ""}
              onChange={(e) =>
                setWeightKg(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
            />
            {errors.weight && (
              <div className="error-message">Valid weight is required</div>
            )}
          </div>

          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              placeholder="Enter your height"
              className={`input-field ${errors.height ? "error" : ""}`}
              value={heightCm || ""}
              onChange={(e) =>
                setHeightCm(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
            />
            {errors.height && (
              <div className="error-message">Valid height is required</div>
            )}
          </div>
        </div>
      </div>

      <button
        className={`button ${!weightKg || !heightCm ? "disabled" : ""} but`}
        onClick={validateAndNavigate}
      >
        All SET!
      </button>
    </div>
  );
};

export default SignUp3;
