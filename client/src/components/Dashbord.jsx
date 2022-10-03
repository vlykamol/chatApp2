import React from 'react'
import { useRoom } from '../context/roomContext'
import Contacts from './Contacts'
import Room from './Room'

export default function Dashbord() {
  return (
    <div className='bg-black/30 overflow-hidden grow p-4 w-full h-full flex flex-col sm:flex-row gap-1'>
      <Contacts />
      <Room />
    </div>
  )
}
