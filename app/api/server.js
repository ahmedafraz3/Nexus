import express from 'express';
import http from 'http';
import { Server as socketIo } from 'socket.io';

// Set up the express app and http server
const app = express();
const server = http.createServer(app);
const io = new socketIo(server);

// Store room data (In-memory for simplicity)
let rooms = {}; // This will hold roomId as keys and participant data as values

// Utility to get participants for a room
const getParticipants = (roomId) => {
  return rooms[roomId] ? rooms[roomId] : [];
};

// Handle socket connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle joining a room
  socket.on('joinRoom', (roomId, username) => {
    console.log(`${username} joined room: ${roomId}`);
    socket.join(roomId);

    // Add the participant to the room data
    if (!rooms[roomId]) rooms[roomId] = [];
    rooms[roomId].push({ id: socket.id, username });

    io.to(roomId).emit('participants', getParticipants(roomId));
  });

  // Handle audio status change
  socket.on('audioStatus', (status) => {
    socket.broadcast.emit('audioStatus', { id: socket.id, status });
  });

  // Handle screen share status change
  socket.on('screenShare', (status) => {
    socket.broadcast.emit('screenShare', { id: socket.id, status });
  });

  // Handle sending a message
  socket.on('sendMessage', (message) => {
    io.to(message.roomId).emit('message', message);
  });

  // Handle adding a participant
  socket.on('addParticipant', (participant) => {
    if (!rooms[participant.roomId]) rooms[participant.roomId] = [];
    rooms[participant.roomId].push(participant);
    io.to(participant.roomId).emit('participants', getParticipants(participant.roomId));
  });

  // Handle removing a participant
  socket.on('removeParticipant', (id) => {
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((participant) => participant.id !== id);
      io.to(roomId).emit('participants', getParticipants(roomId));
    }
  });

  // Handle leaving the room
  socket.on('leaveRoom', (roomId, username) => {
    socket.leave(roomId);
    rooms[roomId] = rooms[roomId].filter((participant) => participant.username !== username);
    io.to(roomId).emit('participants', getParticipants(roomId));
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Remove user from rooms on disconnect
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((participant) => participant.id !== socket.id);
      io.to(roomId).emit('participants', getParticipants(roomId));
    }
  });
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
