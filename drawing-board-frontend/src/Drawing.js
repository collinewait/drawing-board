import React, { useEffect, useState } from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine, subscribeToDrawingLines, socket } from './api';
const Drawing = ({
  location: {
    state: { drawing },
  },
}) => {
  const [lines, setLines] = useState([]);

  const handleDraw = line => {
    publishLine({
      drawingId: drawing.id,
      line,
    });
  };

  useEffect(() => {
    let subscription;
    subscribeToDrawingLines(drawing.id, bufferedTimeStream => {
      subscription = bufferedTimeStream.subscribe(linesEvent => {
        setLines(prevLines => [...prevLines, ...linesEvent.lines]);
      });
    });

    return () => {
      socket.off(`drawingLine:${drawing.id}`, null);
      subscription.unsubscribe();
    };
  }, [drawing.id]);

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
