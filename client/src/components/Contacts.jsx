import axios from 'axios'
import { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRoom } from '../context/roomContext'


export default function Contacts() {

  const { rooms, createNewRoom, joinRoom, setActiveRoom } = useRoom()

  const roomName = useRef()

  const handleCreateNewRoom = () => {
    createNewRoom(roomName.current.value)
    roomName.current.value = ''
  }

  const handleJoinRoom = () => {
    joinRoom(roomName.current.value)
    roomName.current.value = ''
  }

  return (
    <div className='bg-black/50 basis-1/3 rounded'>
      <h1 className='text-4xl font-semibold bg-black/20 p-2 text-center'>Contacts</h1>
      <div className='flex flex-col gap-1 justify-center items-center my-1'>
        <div className='m-2 flex flex-col justify-center items-center gap-2'>
          <input className='flex-grow p-2 bg-transparent/25 border-b-2 rounded-md w-full'
          ref={roomName}
          type="text" />
          <button onClick={handleCreateNewRoom} className='bg-white/25 p-2 rounded w-full'>Create New room</button>

          <button onClick={handleJoinRoom} className='bg-white/25 p-2 rounded w-full'>Join room</button>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <h1 className='text-center py-1 m-1 border-b-orange-50 border-b-2'>rooms</h1>
          {rooms.map((room, key) => {
            return <div onClick={() => setActiveRoom(room)} className='bg-white/10 mx-2 p-2 rounded text-center' key={key}>{room.roomName}</div>
          })}
        </div>
      </div>
    </div>
  )
}
