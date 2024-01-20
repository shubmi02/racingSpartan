import React, { useState } from 'react';
import './CoolDiv.css'; // Import the CSS file

const CoolDiv = ({ element, up, left, width, height }) => {
  // State for div position and size

  return (
    <div  style={{
        position: 'absolute',
        top: `${up}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        // border: '1px solid black',
      }}>
      {element}
      </div>
  );
};

export default CoolDiv;
