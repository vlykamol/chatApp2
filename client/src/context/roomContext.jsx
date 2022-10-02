import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const roomContext = createContext();

export function useRoom() {
  return useContext(roomContext);
}

const socket = io("/", {
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
  const [activeRoom, setActiveRoom] = useState({roomName: "lobby"})

  useEffect(() => {
    axios.get(`/rooms/getAllRooms/${user._id}`).then(res => {
      setRooms(res.data)
      console.log(res.data);
    }).catch(err => console.log("err", err))
  }, [])

  const msgToAll = (message) => {
    socket.emit('messageAll', {user, message})
  }

  const sendMessage = (roomName, message) => {
    console.log('sending msg to', roomName, message);
    socket.emit("message", { user, roomName, message });
  };

  const createNewRoom = (roomName) => {
    axios.post(`/rooms/createRoom`, {_id: user._id, roomName}).then(res => {
      console.log('new room created', res);
    }).catch(err => console.log("err while creating new room", err))
  }


  const joinRoom = (roomName) => {
    axios.post(`/rooms/joinRoom`, {_id: user._id, roomName}).then(res => {
      console.log('new room joined', res);
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
