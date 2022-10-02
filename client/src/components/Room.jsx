import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRoom } from "../context/roomContext";

export default function Room() {

  const { user } = useAuth()
  const messageRef = useRef()
  const [messages, setMessages] = useState([])

  const { socket, sendMessage, activeRoom } = useRoom()

  useEffect(() => {

    socket.on('message', data => {
      const {roomName, user, message} = data
      console.log(roomName, user, 'send message: ', message);
      setMessages([...messages, data])

    })
  }, [socket, messages])

  useEffect(() => {
    // axios.get(`http://localhost:8080/rooms/${activeRoom.roomName}`).then(res => console.log('res', res)).catch(err => console.log(err))
    socket.emit("joinRoom", {userName:user.user, _id: user._id, roomName:activeRoom.roomName});
  },[activeRoom])

  const handelMessage = () => {
    sendMessage(activeRoom.roomName, messageRef.current.value)
    setMessages([...messages, {user:"me", message: messageRef.current.value}])
    messageRef.current.value = ""
  }
  
  return (
    <div className='bg-black/25 flex flex-col gap-1 basis-2/3 rounded'>
      <h1 className='text-4xl font-semibold bg-black/20 p-2 text-center'>{activeRoom.roomName}</h1>
      <div className='flex flex-col justify-between items-center w-full h-full'>
        <div className='bg-black/20 w-full h-96 overflow-auto grow p-1 flex flex-col gap-1'>
          {messages.map((msg, key) => {
            return <div className={`w-full` }key={key}>
                    <div className={`flex flex-col ${msg.user === "me" ? 'items-end text-right' : ''}`}> 
                      <div className='bg-slate-200/10 rounded p-1 w-1/3'>
                        <h1>{msg.user}</h1>
                        {msg.message}
                       </div>
                    </div>
              </div>
          })}
        </div>
        <div className='w-full flex p-1 grow-0 justify-center items-center gap-1'>
          <input ref={messageRef} className='flex-grow p-2 bg-transparent/25 border-b-2 rounded-md' type="text" />
          <button onClick={handelMessage} className='bg-black/25 p-2 rounded'>send</button>
        </div>
      </div>
    </div>
  )
}
