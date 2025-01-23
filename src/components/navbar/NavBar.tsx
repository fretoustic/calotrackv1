import { useUserProfileStore, useThemeStore } from "../../store";
import "./NavBar.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const NavBar = () => {
  const { name, weightKg, heightCm } = useUserProfileStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const calculateBMI = () => {
    if (!weightKg || !heightCm) return null;
    const heightM = heightCm / 100;
    return (weightKg / (heightM * heightM)).toFixed(1);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-section">
          <span className="welcome-text">
            {name ? `Welcome Back, ${name}!` : "Welcome!"}
          </span>
        </div>
        <div className="navbar-section">
          <span className="app-title">CaloTrack</span>
        </div>
        <div className="navbar-section">
          <span className="bmi-text">
            {calculateBMI() ? `Your current BMI: ${calculateBMI()}` : ""}
          </span>
          <button 
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
