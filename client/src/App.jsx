import {Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Dashbord from "./components/Dashbord"
import Footer from "./components/Footer"
import { AuthProvider } from "./context/AuthContext"
import { RoomProvider } from "./context/roomContext"
import PrivateRoute from "./utilites/PrivateRoute"


function App() {
  return (
    <div className="flex flex-col w-full h-screen items-center">
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
          <Route path="/dashbord" element={<PrivateRoute>
             <RoomProvider>
                <Dashbord />
             </RoomProvider>
            </PrivateRoute>}/>
        </Routes>
      <Footer />
    </AuthProvider>
    </div>
  )
}

export default App
