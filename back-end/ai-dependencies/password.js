function generateSalt() {
  const randomNumber = Math.floor(Math.random() * Math.pow(10, 13));
  return randomNumber;
}

function hash(input, salt) {
  // Convert input and salt to ArrayBuffers
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(input);
  const saltBuffer = encoder.encode(salt);

  // Concatenate input and salt
  const combinedBuffer = new Uint8Array(dataBuffer.length + saltBuffer.length);
  combinedBuffer.set(dataBuffer, 0);
  combinedBuffer.set(saltBuffer, dataBuffer.length);

  // Initialize hash value
  let hash = 5381;

  // Hash each byte in the combined ArrayBuffer
  for (let i = 0; i < combinedBuffer.length; i++) {
    hash = (hash * 33) ^ combinedBuffer[i];
  }

  // Ensure the hash is a positive integer
  return (hash >>> 0).toString(16);
}

module.exports = { hash, generateSalt};

// Example usage:
// const simpleHashWithSalt = require('./yourFileName'); // Uncomment and replace 'yourFileName' with the actual path
// const input = 'myDataToHash';
// const salt = 'randomSalt';
// const hashedValue = simpleHashWithSalt(input, salt);
// console.log('Input:', input);
// console.log('Salt:', salt);
// console.log('Hashed Value with Salt:', hashedValue);
