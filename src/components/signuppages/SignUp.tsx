import { useNavigate } from "react-router-dom";
import "./signup.css";
import image from "../../assets/backdrop.png";
const SignUp = () => {
  const navigate = useNavigate();

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
};

export default SignUp;
