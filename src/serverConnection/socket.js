import { io } from "socket.io-client";

let socket;

export const initializeSocket = async (name) => {
  console.log("SocketİNİT", socket)
  if (!socket) {
    socket = io("https://sickcord-backend.onrender.com",{
      query: { name }
    });
  }
  return socket;
};
