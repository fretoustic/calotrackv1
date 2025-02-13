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
  const { name, email, password, setName, setEmail ,setPassword} = useUserProfileStore();
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
  const validateAndNavigate1 = async () => {
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
      try {
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            weight: weightKg,
            height: heightCm
          }),
        });
        const data = await response.json();
        document.cookie = `authToken=${data.token}; path=/; secure; SameSite=Strict`;
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        console.log('Signup successful:', data);
      } catch (error) {
        console.error('Error during signup:', error);
      }
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
            <br></br>
            <div className="button" onClick={() => navigate("/signin")}>
            Sign In
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
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
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
  } else if (signUpIndex === 4) {
    return (
      <div
        className="signup-container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="content-container">
          <h2 className="title">Login</h2>

          <div className="input-container">
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

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="button but"
                onClick={async () => {
                try {
                  const response = await fetch('http://localhost:8080/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email,
                    password,
                  }),
                  });
                  const data = await response.json();
                  if (!response.ok) {
                  throw new Error('Sign in failed');
                  }
                  document.cookie = `authToken=${data.token}; path=/; secure; SameSite=Strict`;
                  navigate("/homepage");
                } catch (error) {
                  console.error('Error during sign in:', error);
                }
                }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default SignUp;