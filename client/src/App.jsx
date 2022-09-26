import {Routes, Route, Router} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Dashbord from "./components/Dashbord"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./utilites/PrivateRoute"


function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashbord" element={<PrivateRoute> <Dashbord /></PrivateRoute>}/>
        </Routes>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default App
