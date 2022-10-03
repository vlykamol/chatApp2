import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRoom } from "../context/roomContext";

export default function Room() {

  const { user, menu } = useAuth()

  const messageRef = useRef()
  const messageEl = useRef(null);
  const [messages, setMessages] = useState([])

  const { socket, sendMessage, activeRoom } = useRoom()

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  useEffect(() => {
    socket.on('message', data => {
      setMessages([...messages, data])
    })
  }, [socket, messages])

  useEffect(() => {
    // axios.get(`${uri}/rooms/${activeRoom.roomName}`).then(res => console.log('res', res)).catch(err => console.log(err))
    socket.emit("joinRoom", {userName:user.user, _id: user._id, roomName:activeRoom.roomName});
    setMessages([])
  },[activeRoom])

  const handelMessage = (e) => {
    e.preventDefault()
    if(messageRef.current.value != ""){
      sendMessage(activeRoom.roomName, messageRef.current.value)
      setMessages([...messages, {user:"me", message: messageRef.current.value}])
      messageRef.current.value = ""
    }
  }

  return (
    <div className={`bg-black/25 grow overflow-hidden flex flex-col gap-1 w-full max-h-full sm:basis-2/3 rounded`}>
      <h1 className='text-4xl font-semibold bg-black/20 p-2 text-center'>{activeRoom.roomName}</h1>
      <div className='flex flex-col overflow-hidden grow justify-between items-center w-full h-full'>
        <div ref={messageEl} className='bg-black/20 w-full grow overflow-auto p-1 flex flex-col gap-1'>
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
        <form className='w-full flex p-1 grow-0 justify-center items-center gap-1'>
          <input ref={messageRef} className='flex-grow p-2 bg-transparent/25 border-b-2 rounded-md' type="text" />
          <button type='submit' onClick={(e)=>handelMessage(e)} className='bg-black/25 p-2 rounded'>send</button>
        </form>
      </div>
    </div>
  )
}
