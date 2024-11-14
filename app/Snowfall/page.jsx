"use client"
import { useEffect } from 'react';

const Snowfall = () => {
  useEffect(() => {
    // Function to generate snowflakes
    function generateSnowflakes(numFlakes) {
      const snowContainer = document.getElementById('snow-container');
      for (let i = 0; i < numFlakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snow');

        // Randomize the position, size, and speed of the snowflake
        const size = Math.random() * 5 + 2 + 'px'; // Snowflake size between 2px and 7px
        const startPositionX = Math.random() * 100 + '%'; // Random start position (left to right)
        const animationDuration = Math.random() * 3 + 2 + 's'; // Duration for falling animation
        const animationDelay = Math.random() * 3 + 's'; // Delay for each snowflake's start time

        // Apply random properties to the snowflake
        snowflake.style.width = size;
        snowflake.style.height = size;
        snowflake.style.left = startPositionX;
        snowflake.style.animationDuration = animationDuration;
        snowflake.style.animationDelay = animationDelay;

        snowContainer.appendChild(snowflake);
      }
    }

    // Generate 100 snowflakes
    generateSnowflakes(100);
  }, []);

  return (
    <div
      id="snow-container"
      className="absolute top-0 w-full h-screen overflow-hidden transition-opacity"
    >
      {/* Snowflakes will be dynamically generated here */}
    </div>
  );
};

export default Snowfall;
