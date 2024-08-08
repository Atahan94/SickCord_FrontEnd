import { io } from "socket.io-client";

let socket;

export const initializeSocket = async (name) => {
  console.log("SocketİNİT", socket)
  if (!socket) {
    socket = io("http://localhost:3000",{
      query: { name }
    });
  }
  return socket;
};
