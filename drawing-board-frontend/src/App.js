import React from 'react';
import './App.css';
import DrawingForm from './DrawingForm';
import DrawingList from './DrawingList';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>Drawing board</h2>
      </div>

      <div className="App-contents">
      <DrawingForm />
      <DrawingList />
      </div>
    </div>
  );
}

export default App;
