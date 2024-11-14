// pages/landing.js
'use client'
import { useEffect, useState } from 'react';

export default function Landing() {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRoomId(params.get('room_id') || '');
    setMessage(params.get('message') || 'This app will not work without camera or microphone access. Please try again and allow it.');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="brand">
            <h1 className="text-xl">
              {/* <a href="/">
                <img src="../images/logo.svg" alt="Nexus Logo" className="h-10" />
              </a> */}
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <section className="container mx-auto text-center px-4 py-16">
          <div className="hero-inner space-y-8">
            <div className="hero-copy space-y-4">
              <h1 className="text-3xl font-bold text-red-500">Access denied.</h1>
              <p className="text-lg text-gray-700">{message}</p>
              <p className="text-md text-gray-600">
                This app will not work without camera or microphone access. Please try again and allow it.
              </p>
            </div>
            <div className="hero-cta">
              <button
                onClick={() =>
                  roomId ? (window.location.href = `/join/${roomId}`) : (window.location.href = '/newroom')
                }
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6">
        <div className="container mx-auto text-center">
          <div className="footer-brand mb-4">
            {/* <a href="/">
              <img className="h-8 mx-auto" src="../images/logo.svg" alt="Logo" />
            </a> */}
          </div>
          <ul className="footer-links space-x-6 text-sm text-gray-700 mb-4">
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              Contact: <a href="https://www.linkedin.com/in/muhammad-bilal-a21084244">Muhammad Bilal</a>
            </li>
          </ul>
          <ul className="footer-social-links flex justify-center space-x-4">
            <li>
              <a target="_blank" href="https://discord.gg/rgGYfeYW3N">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <title>Discord</title>
                  <path
                    d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"
                    fill="#0270D7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.facebook.com/mirotalk">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                    fill="#0270D7"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a target="_blank" href="https://www.youtube.com/watch?v=_IVn2aINYww">
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.925 6.267a3.712 3.712 0 0 0-2.632-2.632C19.017 2.383 12 2.383 12 2.383s-7.016 0-8.292 1.252a3.736 3.736 0 0 0-2.633 2.632C2.383 8.984 2.383 12 2.383 12s0 7.016 1.252 8.292a3.735 3.735 0 0 0 2.632 2.632C4.983 21.617 12 21.617 12 21.617s7.016 0 8.292-1.252a3.711 3.711 0 0 0 2.633-2.632C21.617 15.016 21.617 12 21.617 12s0-7.016-1.252-8.292zM9 14.18V9.818L15.22 12 9 14.18z"
                    fill="#0270D7"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
