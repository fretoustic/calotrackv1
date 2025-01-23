import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="signup-container"
      style={{ backgroundImage: 'url("src/assets/backdrop.png")' }}
    >
      <div className="content-container">
        <h1 className="welcome-title">CaloTrack</h1>
        <h2 className="subtitle">A simplistic calorie tracker.</h2>
      </div>
      <div>
        <div className="but"
          onClick={() => navigate("/signup2")}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default SignUp;
