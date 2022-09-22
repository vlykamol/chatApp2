import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='bg-slate-50'>
      <Link className='text-blue-500 underline' to={'/signup'} >signup</Link>
      <Link className='text-blue-500 underline' to={'/login'} >login</Link>
    </div>
  )
}
