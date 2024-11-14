// "use client";
// import { useState, useEffect, useCallback } from "react";

// export default function ResponsiveVideoApp() {
//   const TABLET_BREAKPOINT = 768; // Tablet breakpoint
//   const DESKTOP_BREAKPOINT = 1024; // Desktop breakpoint
//   const CUSTOM_BREAKPOINT = 600; // Custom breakpoint for transcription room

//   const ratios = ["0:0", "4:3", "16:9", "1:1", "1:2"]; // Aspect ratios

//   // Initial aspect ratio state
//   const [aspect, setAspect] = useState(2); // Default to 16:9 ratio
//   const [ratio, setRatio] = useState(getAspectRatio(2)); // Set initial ratio
//   const [isGridView, setIsGridView] = useState(true); // Default grid view state
//   const [mainUserIndex, setMainUserIndex] = useState(null); // Track main user

//   // Calculate aspect ratio based on selected ratio
//   function getAspectRatio(index) {
//     const [w, h] = ratios[index].split(":").map(Number);
//     return h / w || 0.75;
//   }

//   // Update aspect and ratio when the user changes it
//   const handleAspectChange = (newAspect) => {
//     setAspect(newAspect);
//     setRatio(getAspectRatio(newAspect));
//   };

//   // Toggle between grid and non-grid view
//   const toggleGridView = () => {
//     setIsGridView((prev) => !prev);
//   };

//   // Handle resize logic for various elements
//   const handleResize = useCallback(() => {
//     resizeVideoMedia();
//     resizeMainButtons();
//     resizeChatRoom();
//     resizeTranscriptionRoom();
//   }, [ratio]);

//   // Resize video container based on available space
//   const resizeVideoMedia = () => {
//     const videoContainer = document.getElementById("videoMediaContainer");
//     const cameras = document.getElementsByClassName("Camera");
//     const containerWidth = videoContainer.offsetWidth - 10;
//     const containerHeight = videoContainer.offsetHeight - 10;

//     let i = 1, max = 0;
//     while (i < 5000) {
//       const width = calculateArea(i, cameras.length, containerWidth, containerHeight, 5);
//       if (!width) {
//         max = i - 1;
//         break;
//       }
//       i++;
//     }

//     for (const camera of cameras) {
//       camera.style.width = `${max}px`;
//       camera.style.height = `${max * ratio}px`;
//     }
//   };

//   // Calculate optimal area for video tiles based on ratio and available space
//   const calculateArea = (increment, count, width, height, margin) => {
//     let w = 0, h = increment * ratio + margin * 2;
//     for (let i = 0; i < count; i++) {
//       if (w + increment > width) {
//         w = 0;
//         h += increment * ratio + margin * 2;
//       }
//       w += increment + margin * 2;
//     }
//     return h <= height ? increment : false;
//   };

//   // Resize buttons based on window width
//   const resizeMainButtons = () => {
//     const windowWidth = window.innerWidth;
//     const isVertical = windowWidth <= TABLET_BREAKPOINT;
//     const fontSize = isVertical ? "text-sm" : "text-lg";
//     const padding = isVertical ? "p-2" : "p-4";

//     document.documentElement.style.setProperty('--btn-font-size', fontSize);
//     document.documentElement.style.setProperty('--btn-padding', padding);
//   };

//   // Toggle chat room visibility based on window width
//   const resizeChatRoom = () => {
//     const chatOpen = document.getElementById("chatRoom");
//     if (!chatOpen) return;

//     const windowWidth = window.innerWidth;
//     const isMinimized = windowWidth <= DESKTOP_BREAKPOINT;
//     chatOpen.classList.toggle("minimized", isMinimized);
//   };

//   // Toggle transcription room visibility based on window width
//   const resizeTranscriptionRoom = () => {
//     const transcriptRoom = document.getElementById("transcriptRoom");
//     if (!transcriptRoom) return;

//     const windowWidth = window.innerWidth;
//     const isMinimized = windowWidth <= CUSTOM_BREAKPOINT;
//     transcriptRoom.classList.toggle("minimized", isMinimized);
//   };

//   useEffect(() => {
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [handleResize]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white" id="videoMediaContainer">
//       <header className="bg-gray-800 py-4 flex justify-between items-center px-6">
//         <h1 className="text-lg font-bold">Responsive Video App</h1>
//         <nav className="flex space-x-4">
//           <button onClick={() => handleAspectChange((aspect + 1) % ratios.length)} className="text-gray-300 hover:text-white">
//             Change Aspect Ratio
//           </button>
//           <button onClick={toggleGridView} className="text-gray-300 hover:text-white">
//             Toggle {isGridView ? "Single View" : "Grid View"}
//           </button>
//         </nav>
//       </header>

//       <main className="p-6">
//         <div className={`grid gap-4 ${isGridView ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : ""}`}>
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className={`Camera bg-gray-700 rounded-md p-4 ${mainUserIndex === i ? "lg:col-span-2" : ""}`}>
//               <video className="w-full h-full" autoPlay muted />
//               <div className="text-white mt-2 text-sm">
//                 Participant {i + 1}
//                 {mainUserIndex !== i && (
//                   <button
//                     className="text-sm text-gray-300 mt-2 hover:text-white"
//                     onClick={() => setMainUserIndex(i)}
//                   >
              
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>

//       <div id="chatRoom" className="chatRoom p-4 fixed bottom-0 right-0 bg-gray-800 rounded-lg transition-all">
//         <p className="text-white">Chat Room</p>
//       </div>

//       <div id="transcriptRoom" className="transcriptRoom p-4 fixed bottom-0 left-0 bg-gray-800 rounded-lg transition-all">
//         <p className="text-white">Transcription</p>
//       </div>

//       <style jsx>{`
//         .Camera {
//           height: calc(var(--btn-font-size, 1rem) * 5);
//         }
//         .minimized {
//           transform: scale(0.8);
//           opacity: 0.8;
//         }
//       `}</style>
//     </div>
//   );
// }
