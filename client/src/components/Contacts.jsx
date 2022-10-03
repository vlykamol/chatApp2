import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRoom } from '../context/roomContext'


export default function Contacts() {

  const { rooms, createNewRoom, joinRoom,activeRoom, setActiveRoom } = useRoom()

  const roomName = useRef()
  const [visibility, setVisibility] = useState(true);
  
  const handleCreateNewRoom = () => {
    if(roomName.current.value != '')
      createNewRoom(roomName.current.value)
    roomName.current.value = ''
  }

  const handleJoinRoom = () => {
    if(roomName.current.value != '')
      joinRoom(roomName.current.value)
    roomName.current.value = ''
  }

  return (
    <div className={`bg-black/40 w-full sm:h-full flex flex-col h-min max-h-full sm:basis-1/3 rounded`}>
      <div className='h-full flex flex-col sm:flex'>
        <div className='bg-black/50 flex w-full justify-between items-center p-2'>
          <h1 className='text-4xl font-semibold text-center'>Contacts</h1>
          <button className='sm:hidden' onClick={() => {
                  setVisibility(!visibility)
                }}>{visibility ? "close" : "open"}</button>
        </div>
      {visibility && <div className='flex flex-col overflow-auto min-h-96'>
        <div className='p-2 w-full flex flex-col justify-center items-center gap-2'>
          <input className='p-2 bg-transparent/25 border-b-2 rounded-md w-full'
          ref={roomName}
          type="text" />
          <button onClick={handleCreateNewRoom} className='bg-white/25 p-2 rounded w-full'>Create New room</button>
          <button onClick={handleJoinRoom} className='bg-white/25 p-2 rounded w-full'>Join room</button>
        </div>
        <div className='w-full overflow-auto p-2 grow flex flex-col gap-2'>
          <h1 className='text-center py-1 border-b-orange-50 border-b-2'>Rooms</h1>
          <ul className='flex flex-col h-auto gap-1'>
            {rooms.map((room, key) => {
              return <li 
                onClick={() => {
                  setActiveRoom(room)
                }}
                className={`${activeRoom.roomName === room.roomName ? 'bg-white/50':'bg-white/10'} p-2 rounded text-center`}
                key={key}>
                {room.roomName}
              </li>
            })}
          </ul>
        </div>
      </div>}
      </div>
    </div>
  )
}
