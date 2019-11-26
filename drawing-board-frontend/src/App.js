import React, { useState } from 'react';
import './App.css';
import DrawingForm from './DrawingForm';
import DrawingList from './DrawingList';
import Drawing from './Drawing';
import Connection from './Connection';

const isEmptyObject = obj =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

const App = () => {
  const [selectedDrawing, setSelectedDrawing] = useState({});

  const selectDrawing = drawing => {
    setSelectedDrawing(drawing);
  };
  let ctrl = (
    <>
      <DrawingForm />
      <DrawingList selectDrawing={selectDrawing} />
    </>
  );

  if (!isEmptyObject(selectedDrawing)) {
    ctrl = <Drawing drawing={selectedDrawing} key={selectedDrawing.id} />;
  }
  return (
    <div className="App">
      <div className="App-header">
        <h2>Drawing board</h2>
      </div>

      <div className="App-contents">
        <Connection />
        {ctrl}
      </div>
    </div>
  );
};
export default App;
