import React, { useEffect, useState } from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine, subscribeToDrawingLines } from './api';
const Drawing = ({ drawing }) => {
  const [lines, setLines] = useState([]);

  const handleDraw = line => {
    publishLine({
      drawingId: drawing.id,
      line,
    });
  };

  useEffect(() => {
    subscribeToDrawingLines(drawing.id, line => {
      setLines(prevLines => [...prevLines, line]);
    });
  }, []);

  return drawing ? (
    <div className="Drawing">
      <div className="Drawing-title">{drawing.name}</div>
      <div className="Canvas">
        <Canvas drawingEnabled={true} onDraw={handleDraw} lines={lines} />
      </div>
    </div>
  ) : null;
};
export default Drawing;
