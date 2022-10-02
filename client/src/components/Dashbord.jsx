import React from 'react'
import { useRoom } from '../context/roomContext'
import Contacts from './Contacts'
import Room from './Room'

export default function Dashbord() {
  return (
    <div className='bg-black/30 grow p-4 w-full h-auto flex flex-wrap sm:flex-nowrap gap-1'>
      <Contacts />
      <Room />
    </div>
  )
}
