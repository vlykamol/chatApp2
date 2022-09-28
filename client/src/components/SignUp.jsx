import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
export default function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [alert, setAlert] = useState("");

  const { signup } = useAuth()

  const handelSignup = (e) => {
    e.preventDefault();
    if(password === cPassword){
      setAlert("")
      signup(firstName, lastName, email, password)
    }
    else{
      console.log('password dont match');
      setAlert("password don't match")
    }
  }

  return (
    <div className='flex justify-center items-center w-full h-screen bg-black/50 text-white'>
      <form onSubmit={(e) => handelSignup(e)} autoComplete="off" className='flex flex-col gap-2 rounded bg-black/40 p-4 m-2 w-full sm:w-96'>
        <h2 className='font-bold text-3xl'>SignUp</h2>
        
        {alert && <div className="bg-red-500 p-1 rounded">{alert}</div>}
        <label className='mt-2' htmlFor="first-name">First Name</label>
        <input onChange={(e) => setFirstName(e.target.value)} className='bg-transparent border-b-2 focus:outline-none' type="text" pattern="[a-zA-Z0-9]{3,10}$" placeholder='abc'  required/>

        <label className='mt-2' htmlFor="Last--name">Last Name</label>
        <input onChange={(e) => setLastName(e.target.value)} className='bg-transparent border-b-2 focus:outline-none' type="text" pattern="[a-z]{3,10}$" placeholder='xyz' required/>
        
        <label className='mt-2' htmlFor="email">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className='bg-transparent border-b-2 focus:outline-none' type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='abc@gmail.com' required/>
        
        <label className='mt-2' htmlFor="password">Password</label>
        <input onChange={(e) => setPassword(e.target.value)} className='bg-transparent border-b-2 focus:outline-none' type="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$" placeholder='!password' required/>

        <label className='mt-2' htmlFor="password">Confirm Password</label>
        <input onChange={(e) => setCPassword(e.target.value)} className='bg-transparent border-b-2 focus:outline-none' type="password" placeholder='!password' required/>

        <button type="submit" className='bg-black/70 p-2 my-2 rounded'>login</button>
        <div>
          Already have an account? &nbsp;
          <Link className='text-blue-500 underline' to={'/login'} >login</Link>
        </div>
      </form>
    </div>
  )
}
