import React, { useState } from 'react';

function QuestionEntry() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <label>
        Enter your answer:
        <textarea
         type="text" value={text} onChange={handleChange} 
        />
      </label>
      {/* <p>You entered: {text}</p> */}
    </div>
  );
}

export default QuestionEntry;
