"use client"
import React, { useEffect, useRef } from 'react';

const VideoStream = ({ stream, isLocal, peerName }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if stream is passed and videoRef is available
    if (videoRef.current && stream) {
      console.log('Setting video stream...');
      videoRef.current.srcObject = stream;
    } else {
      console.log('Stream or videoRef not available');
    }
  }, [stream]); // Only re-run effect when the stream changes

  return (
    <div className={`video-stream ${isLocal ? 'local' : 'remote'}`}>
      <video ref={videoRef} autoPlay muted={isLocal} playsInline />
      <p>{isLocal ? 'You' : peerName}</p>
    </div>
  );
};

export default VideoStream;
