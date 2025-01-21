import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './SignUp'
import SignUp2 from './SignUp2'
import SignUp3 from './SignUp3'
import HomePage from './homePage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} />
          <Route path="/homepage" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
