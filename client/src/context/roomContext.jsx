import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const roomContext = createContext();

export function useRoom() {
  return useContext(roomContext);
}

const uri = ``//in dev mode, if serving from server than uri = ``

const socket = io(`${uri}/`, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  }
);

socket.on("connect", () => {
  console.log('connected to io with id:', socket.id);
});

socket.on("disconnect", () => {
  console.log("disconnected from io");
});

export function RoomProvider({ children }) {

  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [activeRoom, setActiveRoom] = useState({roomName: "lobby"})

  useEffect(() => {
    axios.get(`${uri}/rooms/getAllRooms/${user._id}`).then(res => {
      setRooms([{roomName : "lobby"}, ...res.data])
      console.log(res.data);
    }).catch(err => console.log("err", err))
  }, [refresh])

  useEffect(()=>{
    console.log('refreshing');
  },[refresh])

  const msgToAll = (message) => {
    socket.emit('messageAll', {user, message})
  }

  const sendMessage = (roomName, message) => {
    console.log('sending msg to', roomName, message);
    socket.emit("message", { user, roomName, message });
  };

  const createNewRoom = (roomName) => {
    axios.post(`${uri}/rooms/createRoom`, {_id: user._id, roomName}).then(res => {
      console.log('new room created', res);
      setRefresh(b => !b)
    }).catch(err => console.log("err while creating new room", err))
  }


  const joinRoom = (roomName) => {
    axios.post(`${uri}/rooms/joinRoom`, {_id: user._id, roomName}).then(res => {
      console.log('new room joined', res);
      setRefresh(b => !b)
    }).catch(err => console.log("err while joining new room", err))
  }

  const value = {
    socket,
    rooms,
    activeRoom,
    setActiveRoom,
    createNewRoom,
    joinRoom,
    setRooms,
    msgToAll,
    sendMessage,
  };

  return <roomContext.Provider value={value}>{children}</roomContext.Provider>;
}
