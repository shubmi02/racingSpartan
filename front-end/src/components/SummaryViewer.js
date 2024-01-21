import React from "react";

const SummaryViewer = ({ text }) => {
  return(

    <div style={{
      maxHeight: '300px',
      overflow: 'auto',
      border: '2px solid #ccc',
      padding: '20px',
      backgroundColor: 'orange',
      display: 'flex'
    }}>
      {text}
    </div>
  );
};

export default SummaryViewer