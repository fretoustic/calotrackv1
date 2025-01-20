import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignUp2 from './pages/SignUp2'
import SignUp3 from './pages/SignUp3'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signup2" element={<SignUp2 />} />
          <Route path="/signup3" element={<SignUp3 />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
