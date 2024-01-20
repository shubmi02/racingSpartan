import React, { useState, useEffect } from 'react';
import './TestViewer.css'; // Import the CSS file

const TextViewer = ({ text }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the position to create a sliding effect
      setPosition((prevPosition) => (prevPosition === 100 ? 0 : prevPosition + 1));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sliding-text-window">
      <div className="text-content" style={{ transform: `translateX(-${position}%)` }}>
        {text}
      </div>
    </div>
  );
};

export default TextViewer;