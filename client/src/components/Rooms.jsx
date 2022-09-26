import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    axios.get('/rooms').then(res => setRooms(res.data.rooms)).catch(err => console.log('err at fetching rooms',err))
  },[])
  return (
    <div className='flex'>
      <h1 className=''>Rooms</h1>
    </div>
  )
}
