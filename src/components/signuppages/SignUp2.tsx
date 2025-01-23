import { useNavigate } from "react-router-dom";
import { useUserProfileStore } from "../../store";
import { useState } from "react";
import "./signup.css";

const SignUp2 = () => {
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

  return (
    <div 
      className="signup-container"
      style={{ backgroundImage: 'url("src/assets/backdrop.png")' }}
    >
      <div className="content-container">
        <div className="title">Let's get to know you!</div>

        <div className="input-container">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`input-field ${errors.name ? 'error' : ''}`}
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
              className={`input-field ${errors.email ? 'error' : ''}`}
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="error-message">Valid email is required</div>
            )}
          </div>

          <button
            className={`button ${(!name || !email) ? 'disabled' : ''} but` }
            onClick={validateAndNavigate}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
