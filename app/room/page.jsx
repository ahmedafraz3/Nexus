"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faMicrophone, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
// import Swal from "sweetalert2";
import io from "socket.io-client";
import Image from "next/image";
import img1 from "../../public/images/loading.gif"
import IconComponent from "../Icon/Icon"
import Link from "next/link";

const Room = () => {
  const [loading, setLoading] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [shareScreen, setShareScreen] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId] = useState("room-123");  // Example room ID
  // const [roomQR, setRoomQR] = useState(null);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  const socket = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef([]);
  const localStream = useRef(null);
  const screenStream = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000");  // Replace with your server URL
    const storedUsername = localStorage.getItem("username");
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const name = prompt("Enter your name");
      if (name) {
        setUsername(name);
        localStorage.setItem("username", name);
      }
    }

    setMessages(storedMessages);
    setLoading(false);
    socket.current.emit("joinRoom", roomId, username);

    socket.current.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.current.on("participants", setParticipants);
    socket.current.on("screenShare", setShareScreen);

    return () => socket.current.disconnect();
  }, [roomId, username]);

  useEffect(() => {
    initMediaStreams();
  }, [videoEnabled, audioEnabled]);

  const initMediaStreams = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
      });
      localStream.current = stream;
      localVideoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing media devices: ", err);
    }
  };

  const toggleMediaStream = (stream, type, enabled) => {
    if (!stream) {
      console.error("Stream is null or undefined");
      return; // Exit the function if stream is not available
    }
  
    const track = stream.getTracks().find((t) => t.kind === type);
    if (track) {
      track.enabled = enabled;
    } else {
      console.error(`No track of kind ${type} found`);
    }
  };

  const handleVideoToggle = () => {
    setVideoEnabled((prev) => !prev);
    toggleMediaStream(localStream.current, "video", !videoEnabled);
  };

  const handleAudioToggle = () => {
    setAudioEnabled((prev) => !prev);
    toggleMediaStream(localStream.current, "audio", !audioEnabled);
  };

  const handleScreenShare = async () => {
    setShareScreen((prev) => !prev);
    if (!shareScreen) {
      startScreenSharing();
    } else {
      stopScreenSharing();
    }
  };

  const startScreenSharing = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      screenStream.getTracks().forEach((track) => localStream.current.addTrack(track));
      screenStream.current = screenStream;
    } catch (err) {
      console.error("Error starting screen sharing: ", err);
    }
  };

  const stopScreenSharing = () => {
    const screenTrack = screenStream.current?.getTracks()[0];
    if (screenTrack) {
      screenTrack.stop();
      localStream.current.removeTrack(screenTrack);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { user: username || "Guest", text: message, timestamp: new Date(), id: Date.now() };
      socket.current.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.current.emit("typing", username);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleRoomQR = () => {
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&size=200x200`;
    setRoomQR(qrCode);
  };

  const handleLeaveRoom = () => {
    // Notify the server that the user is leaving the room
    socket.current.emit("leaveRoom", roomId, username);
  
    // Stop all media tracks (audio/video)
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop()); // Stop the tracks (audio/video) of the local stream
    }
  
    if (screenStream.current) {
      screenStream.current.getTracks().forEach(track => track.stop()); // Stop the screen sharing stream
    }
  
    // Remove the video elements from the DOM
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null; // Stop the video from being displayed
    }
  
    // Optionally, handle other cleanup tasks (like leaving the socket room)
    socket.current.disconnect();
  
    // Optionally, redirect the user to a different page or show a confirmation message
    window.location.href = "/"; // Example: Redirect to home page after leaving the room
  };
  

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Head>
        <title>Nexus Room - Video, Chat, and Screen Sharing</title>
        <meta name="description" content="Real-time video chat and screen sharing app with messaging and participants list." />
        <link rel="icon" href="/images/logo.svg" />
      </Head>

      {loading ? (
        <div className="flex flex-col items-center justify-around text-white p-8 text-center rounded-lg bg-black">
     <div className="flex justify-start items-center">
     <h1 className="p-2 text-6xl font-comfortaa rounded-lg">Loading</h1>
     </div>
    <div className="flex justify-center items-center size-10\
    ">
    <Image
        src={img1}
        alt="Loading..."
        className="w-100 h-100 mt-1 mb-2 rounded-lg"
      />
    </div>
     <div className="flex justify-end items-end mb-0">
     <pre className="p-2 font-comfortaa rounded-lg">
        Please allow the camera or microphone
        access to use this app.
      </pre>
     </div>
    </div>
      ) : (
        <div className="flex-grow flex flex-col">
          <header className="flex items-center justify-between p-4 bg-gray-900">
            <div className="flex items-center space-x-6">
              <FontAwesomeIcon icon={faVideo} size="lg" onClick={handleVideoToggle} className="cursor-pointer hover:text-green-500" />
              <FontAwesomeIcon icon={faMicrophone} size="lg" onClick={handleAudioToggle} className="cursor-pointer hover:text-green-500" />
              <FontAwesomeIcon icon={faShareSquare} size="lg" onClick={handleScreenShare} className="cursor-pointer hover:text-green-500" />
            </div>
          <Link href="/main">
          <button onClick={handleLeaveRoom} className="bg-red-600 text-white p-2 rounded shadow-lg hover:bg-red-700">
              Leave Room
            </button>
          </Link>
          </header>


        

          {/* Main content */}




          <div className="flex-col justify-evenly mt-6 items-start ">




          
            <div className="flex ">



  {/* Sidebar for icons */}
  <div className="flex flex-col items-start justify-start   ml-5   bg-black hover:cursor-pointer">
            <IconComponent type="presenter" active />
            {/* <IconComponent type="guest" /> */}
            <IconComponent type="audioOn" active={audioEnabled} onClick={() => setAudioEnabled(!audioEnabled)} />
            <IconComponent type="videoOn" active={videoEnabled} onClick={() => setVideoEnabled(!videoEnabled)} />
            <IconComponent type="screenOn" active={shareScreen} onClick={() => setShareScreen(!shareScreen)} />
            <IconComponent type="raiseHand" />
            <IconComponent type="acceptPeer" />
            <IconComponent type="banPeer" />
            <IconComponent type="geoLocation" />
            <IconComponent type="sendFile" />
            <IconComponent type="sendMsg" />
            <IconComponent type="sendVideo" />
          </div>


{/* participants */}

        <div className="flex mx-auto">

        <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-gray-700" />
              {participants.map((participant) => (
                <div key={participant.id} className="relative">
                  <video
                    ref={(el) => (remoteVideosRef.current[participant.id] = el)}
                    autoPlay
                    className="w-full h-full object-cover rounded-lg shadow-lg border-2 border-gray-700"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white p-1 text-sm rounded-full">
                    {participant.name}
                  </div>
                </div>
              ))}
            </div>


        </div>

        {/* <div className="flex-grow flex items-center justify-center">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="w-auto max-h-3/4 object-contain rounded-lg border-2 border-gray-700"
            />
          </div> */}






{/* messages */}

            <div className="mt-6 bg-black">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={handleTyping}
                  className="p-3 w-full rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="p-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700">
                  Send
                </button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => setIsEmojiPickerVisible((prev) => !prev)} className="text-xl">
                  😀
                </button>
                {isEmojiPickerVisible && <EmojiPicker onEmojiClick={handleEmojiClick} />}
              </div>
              <div className="chat-box mt-6 max-h-96 overflow-y-auto bg-gray-900 p-4 rounded-lg">
                {messages.map((msg) => (
                  <div key={msg.id} className="mb-4">
                    <div className="text-sm font-semibold">{msg.user}</div>
                    <div className="text-sm">{msg.text}</div>
                    <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

{/* QRcode */}

          <div className="p-4 bg-black">
            <button onClick={handleRoomQR} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
              Room QR Code
            </button>
            {/* {roomQR && (
              <div className="mt-4">
                <img src={roomQR} alt="Room QR Code" className="w-32 h-32" />
              </div>
            )} */}
          </div>

        <div>
        <Link href="/translation">
        <button
  className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
  onClick={() => alert('Transcription started!')} 
  target="_blank"
>
  Transcription
</button>
        </Link>
        </div>


        </div>
      )}
    </div>
  );
};

export default Room;
