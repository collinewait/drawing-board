import React from 'react';
import Canvas from 'simple-react-canvas';

const Drawing = ({ drawing }) => {
  return drawing ? (
    <div className="Drawing">
      <div className="Drawing-title">{drawing.name}</div>
      <div className="Canvas">
        <Canvas drawingEnabled={true} />
      </div>
    </div>
  ) : null;
};
export default Drawing;
