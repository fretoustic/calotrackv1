import { useNavigate } from "react-router-dom";
import "./signup.css";
import image from "../../assets/backdrop.png";
import { useState } from "react";
import { useUserProfileStore, useWeightStore } from "../../store";

interface Props {
  signUpIndex: number;
}
const SignUp = ({ signUpIndex }: Props) => {
  const navigate = useNavigate();
  const { name, email, setName, setEmail } = useUserProfileStore();
  const [errors, setErrors] = useState({ name: false, email: false });
  const validateAndNavigate = () => {
    const newErrors = {
      name: !name || name.trim() === "",
      email: !email || !email.includes("@") || email.trim() === "",
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email) {
      navigate("/signup3");
    }
  };
  const { weightKg, heightCm, setWeightKg, setHeightCm } =
    useUserProfileStore();
  const { addWeightEntry } = useWeightStore();
  const [errors1, setErrors1] = useState({ weight: false, height: false });
  const validateAndNavigate1 = () => {
    const newErrors = {
      weight: !weightKg || weightKg <= 0,
      height: !heightCm || heightCm <= 0,
    };

    setErrors1(newErrors);

    if (!newErrors.weight && !newErrors.height) {
      addWeightEntry({
        value: weightKg,
        timestamp: new Date().toISOString(),
      });
      navigate("/homepage");
    }
  };
  if (signUpIndex === 1) {
    return (
      <div
        className="signup-container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="content-container">
          <h1 className="welcome-title">CaloTrack</h1>
          <h2 className="subtitle">A simplistic calorie tracker.</h2>
        </div>
        <div>
          <div className="button" onClick={() => navigate("/signup2")}>
            Sign Up
          </div>
        </div>
      </div>
    );
  } else if (signUpIndex === 2) {
    return (
      <div
        className="signup-container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="content-container">
          <div className="title">Let's get to know you!</div>

          <div className="input-container">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`input-field ${errors.name ? "error" : ""}`}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <div className="error-message">Name is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input-field ${errors.email ? "error" : ""}`}
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="error-message">Valid email is required</div>
              )}
            </div>

            <button
              className={`button ${!name || !email ? "disabled" : ""} but`}
              onClick={validateAndNavigate}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  } else if (signUpIndex === 3) {
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
                className={`input-field ${errors1.weight ? "error" : ""}`}
                value={weightKg || ""}
                onChange={(e) =>
                  setWeightKg(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
              />
              {errors1.weight && (
                <div className="error-message">Valid weight is required</div>
              )}
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                placeholder="Enter your height"
                className={`input-field ${errors1.height ? "error" : ""}`}
                value={heightCm || ""}
                onChange={(e) =>
                  setHeightCm(
                    e.target.value === "" ? 0 : parseFloat(e.target.value)
                  )
                }
              />
              {errors1.height && (
                <div className="error-message">Valid height is required</div>
              )}
            </div>
          </div>
        </div>

        <button
          className={`button ${!weightKg || !heightCm ? "disabled" : ""} but`}
          onClick={validateAndNavigate1}
        >
          All SET!
        </button>
      </div>
    );
  }
};

export default SignUp;
