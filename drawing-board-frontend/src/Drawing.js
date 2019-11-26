import React from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine } from './api';
const Drawing = ({ drawing }) => {
  const handleDraw = line => {
    publishLine({
      drawingId: drawing.id,
      line,
    });
  };

  return drawing ? (
    <div className="Drawing">
      <div className="Drawing-title">{drawing.name}</div>
      <div className="Canvas">
        <Canvas drawingEnabled={true} onDraw={handleDraw} />
      </div>
    </div>
  ) : null;
};
export default Drawing;
