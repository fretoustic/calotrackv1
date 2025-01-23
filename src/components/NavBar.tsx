import { useUserProfileStore, useThemeStore } from "../store";
import './NavBar.css';

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
            {name ? `Welcome Back, ${name}!` : 'Welcome!'}
          </span>
        </div>
        <div className="navbar-section">
          <span className="app-title">CaloTrack</span>
        </div>
        <div className="navbar-section">
          <span className="bmi-text">
            {calculateBMI() ? `Your current BMI: ${calculateBMI()}` : ''}
          </span>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider">
              <span className="icon">🌙</span>
              <span className="icon">☀️</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
