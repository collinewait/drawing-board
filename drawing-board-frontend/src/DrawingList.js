import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subscribeToDrawings, socket } from './api';

const DrawingList = () => {
  const [drawings, setDrawings] = useState([]);

  const drawingsHandler = drawing => {
    setDrawings(prevDrawings => prevDrawings.concat([drawing]));
  };

  useEffect(() => {
    subscribeToDrawings(drawingsHandler);
    return () => {
      socket.off('drawing', drawingsHandler);
    };
  }, []);

  const drawingItems = drawings.map(drawing => (
    <Link
      to={{ pathname: '/drawing', state: { drawing } }}
      key={drawing.id}
      className="Drawing-link"
    >
      <li className="DrawingList-item" key={drawing.id}>
        {drawing.name}
      </li>
    </Link>
  ));
  return <ul className="DrawingList">{drawingItems}</ul>;
};

export default DrawingList;
