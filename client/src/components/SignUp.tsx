import { Link } from "react-router-dom"
export default function SignUp() {
  return (
    <div className='flex justify-center items-center w-full h-screen bg-black/50 text-white'>
      <div className='flex flex-col gap-2 rounded bg-black/40 p-4 m-2 w-full sm:w-96'>
        <h2 className='font-bold text-3xl'>SignUp</h2>
        
        <label className='mt-2' htmlFor="first-name">First Name</label>
        <input className='bg-transparent border-b-2 focus:outline-none' type="text" placeholder='abc'/>

        <label className='mt-2' htmlFor="Last--name">Last Name</label>
        <input className='bg-transparent border-b-2 focus:outline-none' type="text" placeholder='xyz'/>
        
        <label className='mt-2' htmlFor="email">Email</label>
        <input className='bg-transparent border-b-2 focus:outline-none' type="text" placeholder='abc@gmail.com'/>
        
        <label className='mt-2' htmlFor="password">Password</label>
        <input className='bg-transparent border-b-2 focus:outline-none' type="password" placeholder='!password'/>

        <button className='bg-black/70 p-2 my-2 rounded'>login</button>
        <div>
          Already have an account? &nbsp;
          <Link className='text-blue-500 underline' to={'/login'} >login</Link>
        </div>
      </div>
    </div>
  )
}
