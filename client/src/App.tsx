import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Footer from "./components/Footer"


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
