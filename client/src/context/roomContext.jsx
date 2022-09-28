import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const roomContext = createContext();

export function useRoom() {
  return useContext(roomContext);
}

const socket = io("http://localhost:8080", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  }
);

socket.on("connect", () => {
  console.log('connected to io', socket.id);
});

socket.on("disconnect", () => {
  console.log("disconnected from io");
});

export function RoomProvider({ children }) {
  const { user } = useAuth();

  const [roomName, setRoomName] = useState("");

  socket.on('messageAll', message => {
    console.log('message to all : ', message);
  })

  socket.on('message', data => {
    const {roomName, user, message} = data
    console.log(roomName, user, 'send message: ', message);
  })

  const msgToAll = (message) => {
    socket.emit('messageAll', message)
  }

  const sendMessage = (roomName, message) => {
    console.log(roomName, message);
    socket.emit("message", { user, roomName, message });
  };

  const value = {
    socket,
    roomName,
    setRoomName,
    msgToAll,
    sendMessage,
  };

  return <roomContext.Provider value={value}>{children}</roomContext.Provider>;
}
