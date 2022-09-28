import axios from 'axios'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import Contacts from './Contacts'
import Room from './Room'

export default function Dashbord() {
  const {user} = useAuth()

  return (
    <div className='bg-black/30 grow p-4 w-full h-auto flex flex-wrap sm:flex-nowrap gap-1'>
      <Contacts />
      <Room />
    </div>
  )
}
