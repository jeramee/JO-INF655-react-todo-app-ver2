// UuidDisplay.js
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const UuidDisplay = () => {
  const generatedUuid = uuidv4();

  return (
    <div>
      <h1>Generated UUID:</h1>
      <p>{generatedUuid}</p>
    </div>
  );
};

export default UuidDisplay;