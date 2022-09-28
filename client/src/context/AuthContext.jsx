import React, { useContext, useState, useEffect } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AuthContext = React.createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}){

  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if(user){
      setUser(user)
      setIsLoggedIn(true);
    }
  },[])

  const login = (email, password) => {
    axios
      .post("http://localhost:8080/login-data", { email, password })
      .then((res) => {
        console.log(res.data.access_token)
        sessionStorage.setItem('access_token', JSON.stringify(res.data.access_token))
        sessionStorage.setItem('user', JSON.stringify(res.data.user))
        setUser(res.data.user)
        setIsLoggedIn(true)
      })
      .catch((err) => console.log("error while login", err));
  }

  const signup = (firstName, lastName, email, password ) => {
    axios
      .post("/signup-data", { firstName, lastName, email, password })
      .then((res) => {
        console.log(res)
        setUser(res.user)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        console.log("error while signup", err)
      });
  }

  const logout = () => {
    setUser('')
    setIsLoggedIn(false)
    sessionStorage.clear()
  }

  useEffect(() => {
    navigate('/dashbord')
  },[isLoggedIn])
  
  const value = {
    user,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  )
}