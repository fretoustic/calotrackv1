import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signuppages/SignUp";
import HomePage from "./components/homepage/homePage";
import "./global.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp signUpIndex={1} />} />
        <Route path="/signup2" element={<SignUp signUpIndex={2} />} />
        <Route path="/signup3" element={<SignUp signUpIndex={3} />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
