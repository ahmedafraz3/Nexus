import { io } from 'socket.io-client';

let socket;

export const connectSocket = (serverUrl) => {
  if (!socket) {
    socket = io(serverUrl, {
      transports: ['websocket'], // Ensures a stable connection
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    console.error('Socket not initialized. Call connectSocket() first.');
    return null;
  }
  return socket;
};
