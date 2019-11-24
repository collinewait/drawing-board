import React, { useState, useEffect } from 'react';
import { subscribeToDrawings } from './api';

const DrawingList = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    subscribeToDrawings(drawing => {
      setDrawings(prevDrawings => prevDrawings.concat([drawing]));
    });
  }, []);

  const drawingItems = drawings.map(drawing => (
    <li className="DrawingList-item" key={drawing.id}>
      {drawing.name}
    </li>
  ));
  return <ul className="DrawingList">{drawingItems}</ul>;
};

export default DrawingList;
