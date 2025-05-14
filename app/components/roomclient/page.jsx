'use client'; // Added this to indicate client-side rendering in Next.js

import React, { useState, useEffect, useRef } from 'react';
import { cfg, html, mediaType, EVENTS } from '../utils/constants.js';
import VideoStream from '../videostream/page.js'; // Adjusted to match typical structure
import Chat from '../chat/page.js';
import { connectSocket, getSocket } from '../utils/socket.js';

const RoomClient = ({ roomId, peerName, socketUrl }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const localVideoRef = useRef(null);

  // Initialize Socket.IO connection and handle events
  useEffect(() => {
    const socket = connectSocket(socketUrl); // Ensure socket is connected

    socket.on('connect', () => {
      console.log('Connected to signaling server');
      setIsConnected(true);

      // Create or join a room
      socket.emit('createRoom', { roomId, peerName }, (response) => {
        if (response.error) {
          console.error('Error creating/joining room:', response.error);
        } else {
          console.log('Joined room:', response);
          handleRoomEvents(socket);
        }
      });
    });

    socket.on('disconnect', () => {
      console.warn('Disconnected from server');
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [socketUrl, roomId, peerName]);

  // Handle WebRTC and socket events
  const handleRoomEvents = (socket) => {
    socket.on('newProducer', (data) => {
      console.log('New producer in the room:', data);
      consumeMedia(data);
    });

    socket.on('producerClosed', (producerId) => {
      console.log('Producer closed:', producerId);
      removeRemoteStream(producerId);
    });
  };

  // Start local media stream
  const startLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const socket = getSocket();
      if (socket) {
        socket.emit('produce', { roomId, peerName, stream });
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  // Consume remote media stream
  const consumeMedia = async (data) => {
    try {
      const stream = new MediaStream();
      const remoteStream = {
        id: data.producerId,
        peerName: data.peerName,
        stream,
      };
      setRemoteStreams((prevStreams) => [...prevStreams, remoteStream]);

      const tracks = await fetchRemoteTracks(data.producerId);
      tracks.forEach((track) => stream.addTrack(track));
    } catch (error) {
      console.error('Error consuming media:', error);
    }
  };

  // Fetch remote tracks from the server
  const fetchRemoteTracks = async (producerId) => {
    try {
      const socket = getSocket();
      if (!socket) return [];

      return new Promise((resolve) => {
        socket.emit('getProducerTracks', { producerId }, (tracks) => {
          resolve(tracks || []);
        });
      });
    } catch (error) {
      console.error('Error fetching remote tracks:', error);
      return [];
    }
  };

  // Remove remote stream
  const removeRemoteStream = (producerId) => {
    setRemoteStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.id !== producerId)
    );
  };

  return (
    <div className='bg-black'>
      <h1>Room: {roomId}</h1>
      <h2>Welcome, {peerName}!</h2>
      <div>
        <VideoStream stream={localStream} isLocal={true} />
      </div>
      <button onClick={startLocalMedia}>Start Local Media</button>
      <Chat socket={getSocket()} roomId={roomId} />
      <div>
        {remoteStreams.map((remoteStream) => (
          <VideoStream
            key={remoteStream.id}
            stream={remoteStream.stream}
            peerName={remoteStream.peerName}
          />
        ))}
      </div>
      {isConnected ? <p>Connected</p> : <p>Connecting...</p>}
    </div>
  );
};

export default RoomClient;
