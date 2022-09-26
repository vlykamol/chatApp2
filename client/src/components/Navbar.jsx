import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuth()
  return (
    <div className='bg-slate-50 p-2 flex justify-between items-center '>
      <div>
      <Link className='text-blue-500 mx-1 underline' to={'/signup'} >signup</Link>
      <Link className='text-blue-500 mx-1 underline' to={'/login'} >login</Link>
      </div>
      <div className='text-black flex gap-1'>
      <p >{user}</p>
      {user && <button onClick={logout}>logot</button>}
      </div>
    </div>
  )
}
