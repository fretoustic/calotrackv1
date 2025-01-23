import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signuppages/SignUp";
import SignUp2 from "./components/signuppages/SignUp2";
import SignUp3 from "./components/signuppages/SignUp3";
import HomePage from "./components/homepage/homePage";
import "./global.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup2" element={<SignUp2 />} />
        <Route path="/signup3" element={<SignUp3 />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
