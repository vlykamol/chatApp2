import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const {user, logout} = useAuth()

  return (
    <div className='bg-slate-50 w-full grow-0 text-black p-2 flex justify-between items-center '>
      <div className='flex gap-1'>
        <h1>chatApp2</h1>
      </div>
      <div className='flex gap-1'>
      {user ? <button onClick={logout}>logout</button> : <>
      <Link className='mx-1 underline' to={'/signup'} >signup</Link>
      <Link className='mx-1 underline' to={'/login'} >login</Link></>}
      <p>{user && user.user}</p>
      </div>
    </div>
  )
}
