import { useNavigate } from "react-router-dom";
import { useUserProfileStore, useWeightStore } from "../../store";
import { useState } from "react";

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
      className="sign-up3"
      style={{
        backgroundImage: 'url("src/assets/backdrop.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Itim", serif',
        fontWeight: 400,
        fontStyle: "normal",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>
          Some more details for us to help you!
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="Enter your weight"
              style={{
                padding: "0.5rem",
                border: `1px solid ${errors.weight ? "red" : "#ccc"}`,
                borderRadius: "4px",
                width: "100%",
              }}
              value={weightKg || ""}
              onChange={(e) =>
                setWeightKg(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
            />
            {errors.weight && (
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                Valid weight is required
              </div>
            )}
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="Enter your height"
              style={{
                padding: "0.5rem",
                border: `1px solid ${errors.height ? "red" : "#ccc"}`,
                borderRadius: "4px",
                width: "100%",
              }}
              value={heightCm || ""}
              onChange={(e) =>
                setHeightCm(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
            />
            {errors.height && (
              <div style={{ color: "red", fontSize: "0.8rem" }}>
                Valid height is required
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          opacity: !weightKg || !heightCm ? 0.5 : 1,
        }}
        onClick={validateAndNavigate}
      >
        All SET!
      </button>
    </div>
  );
};

export default SignUp3;
