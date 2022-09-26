import axios from 'axios'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import Contacts from './Contacts'
import Rooms from './Rooms'

export default function Dashbord() {
  const {user} = useAuth()
  const getPosts = () => {
    axios.get('/post/all', {
      headers:{
        'authorization': `Bearer ${JSON.parse(sessionStorage.getItem('access_token'))}`
      }
    }).then(res => {
      console.log('res', res);
    }).catch(err =>{
      console.log('err', err);
    })
  }
  return (
    <div className='bg-black/30 p-4 w-full h-screen flex'>
      <Contacts/>
      <Rooms/>
      <button onClick={getPosts}>posts</button>
    </div>
  )
}
