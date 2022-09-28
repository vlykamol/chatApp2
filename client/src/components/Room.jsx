import { useState } from 'react'
import { useRoom } from "../context/roomContext";

export default function Rooms() {

  const [message, setMessage] = useState('')

  const { socket, msgToAll, sendMessage } = useRoom()

  const handelMessage = () => {
    sendMessage('falal', message)
  }

  const handelMessageAll = () => {
    msgToAll(message)
  }
  
  return (
    <div className='bg-black/25 flex flex-col gap-1 basis-2/3 rounded'>
      <h1 className='text-4xl font-semibold bg-black/20 p-2 text-center'>Room</h1>
      <div className='flex flex-col justify-between items-center w-full h-full'>
        <div className='bg-black/20 w-full p-1 h-full overflow-hidden '>
          messages
        </div>
        <div className='w-full flex p-1 justify-center items-center gap-1'>
        <input onChange={e => setMessage(e.target.value)} className='flex-grow p-2 bg-transparent/25 border-b-2 rounded-md' type="text" />
        <button onClick={handelMessageAll}>msg</button>
        <button onClick={handelMessage} className='bg-black/25 p-2 rounded'>send</button>
        </div>
      </div>
    </div>
  )
}
