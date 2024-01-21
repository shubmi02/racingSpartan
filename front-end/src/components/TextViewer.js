import React from 'react';

const TextViewer = ({ text }) => {
  return (
    
    <div style={{ 
      maxHeight: '50%', 
      overflow: 'auto', 
      border: '1px solid #ccc', 
      padding: '10px',
      backgroundColor: 'grey',
      display: 'flex'
    }}>
      {text}
    </div>
  );
};

export default TextViewer;