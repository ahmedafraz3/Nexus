'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Importing Link component from Next.js
import Image from 'next/image';

export default function Home() {
  const [roomName, setRoomName] = useState('');
  
  const genRoom = () => {
    setRoomName(getUUID4());
  };

  const getUUID4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
  };

  const joinRoom = () => {
    if (roomName) {
      window.location.href = `/join/${roomName}`;
      window.localStorage.setItem('lastRoom', roomName);
    } else {
      alert('Room name empty! Please pick a room name.');
    }
  };

  useEffect(() => {
    // Function to generate a random token
    const generateToken = () => {
      // Create a random alphanumeric token of 36 characters
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < 36; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return token;
    };

    // Generate a token every second (1000ms)
    const interval = setInterval(() => {
      const newToken = generateToken();
      setRoomName(newToken); // Update the token
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);
 

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex  mx-auto">
            <h1>
              <Link href="/">
                {/* Image is commented out */}
                {/* <Image src="../../public/images/logo.png" width={100} height={100} alt="Nexus logo" className="w-32" /> */}

                <span className="text-3xl font-bold  text-[#0070f3] ">Nexus</span>
              </Link>
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Pick a name. <br />
            Share URL. <br />
            Start conference.
          </h1>
          <p className="text-lg text-gray-600">
            Each room has its disposable URL. Just pick a room name and share your custom URL. Its that easy.
          </p>
        </div>
      </section>

      {/* Room Name Form Section */}
      <section className="cta bg-white py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-4 text-[#0070f3]">
            Pick a room name. <br />
            How about this one?
          </h3>
          <div className="flex justify-center items-center space-x-4">
          

          <input
      placeholder="Random token will appear here"
      type="text"
      id="roomName"
      className="form-input py-2 px-4 rounded-md border-2 border-gray-300 placeholder-black"
      value={roomName}
      readOnly // Make the input read-only since it's for display
    />

           <Link href="/room"> <button
              onClick={genRoom}
              className="bg-blue-600 text-white py-2 px-6 rounded-md"
            >
              Generate Room
            </button></Link>
          <Link href="/room">
          <button
              onClick={joinRoom}
              className="bg-green-600 text-white py-2 px-6 rounded-md"
            >
              Join Room
            </button>
          </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
     
  {/* Footer */}
  <footer className="bg-[#0070f3] rounded-t-full text-white py-8 mb-0 pb-0 w-full h-full ">
    <div className="container mx-auto text-center">
      <div className="mb-4">
        <Link href="/">
          {/* Image is commented out */}
          {/* <img src="/images/logo.svg" alt="Nexus Logo" className="w-32 mx-auto" /> */}
          <span className="text-3xl font-bold text-white">Nexus</span>
        </Link>
      </div>
      <ul className="flex justify-center space-x-6">
        <li>
          <Link href="/maintenance">
            <span className="text-white hover:text-white cursor-pointer">Maintenance</span>
          </Link>
        </li>
        <li>
          <Link href="/privacypolicy">
            <span className="text-white hover:text-white cursor-pointer">Privacy Policy</span>
          </Link>
        </li>
        <li>
          <span
            onClick={() => window.location.href = "mailto:bilal441465@gmail.com"}
            className="text-white hover:text-white cursor-pointer"
          >
            Mail Us
          </span>
        </li>
      </ul>
      <div className="mt-4">
        <span
          onClick={() => window.location.href = "https://discord.gg/rgGYfeYW3N"}
          className="text-white hover:text-white cursor-pointer"
        >
          Discord
        </span>
      </div>
    </div>
  </footer>


    </div>
  );
}
