import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { BrowserRouter,Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>

    
    </BrowserRouter>
  )
}

export default App
