import React, { useState, useEffect } from 'react';
import './App.css';

const rows = 15;
const cols = 20;

// A list of color palettes to cycle through
const colorPalettes = [
  'rgb(50, 205, 50)', // Lime green
  'rgb(30, 144, 255)', // Dodger blue
  'rgb(255, 165, 0)', // Orange
  'rgb(255, 69, 0)' // Red-orange
];

function App() {
  const [currentCol, setCurrentCol] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [currentColor, setCurrentColor] = useState(colorPalettes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCol(prevCol => {
        let newCol = prevCol + direction;

        // Check for boundary collision
        if (newCol >= cols) {
          setDirection(-1);
          newCol = cols - 1;
          changeColor();
        } else if (newCol < 0) {
          setDirection(1);
          newCol = 0;
          changeColor();
        }
        return newCol;
      });
    }, 150); // Speed of the wave

    return () => clearInterval(interval);
  }, [direction]);

  const changeColor = () => {
    const currentColorIndex = colorPalettes.indexOf(currentColor);
    const newColorIndex = (currentColorIndex + 1) % colorPalettes.length;
    setCurrentColor(colorPalettes[newColorIndex]);
  };

  return (
    <div className="game-container">
      <h1>Fullstack Developer Assignment</h1>
      <p>Technology - React.js</p>
      <div className="grid-container">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {Array.from({ length: cols }).map((_, colIndex) => {
              // Calculate the distance from the current wave center
              const distance = Math.abs(colIndex - currentCol);
              
              // Calculate opacity based on distance to create a smooth fade effect
              const opacity = Math.max(0, 1 - distance / 5);

              // Use a gradient effect for the color
              const red = parseInt(currentColor.substring(4, 7));
              const green = parseInt(currentColor.substring(9, 12));
              const blue = parseInt(currentColor.substring(14, 17));

              const newRed = Math.round(red * opacity);
              const newGreen = Math.round(green * opacity);
              const newBlue = Math.round(blue * opacity);

              const squareColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;

              return (
                <div
                  key={colIndex}
                  className="grid-square"
                  style={{
                    backgroundColor: squareColor,
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;