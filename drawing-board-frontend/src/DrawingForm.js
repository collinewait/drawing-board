import React, { useState } from 'react';
import { createDrawing } from './api';

const DrawingForm = () => {
  const [drawingName, setDrawingName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    createDrawing(drawingName);
    setDrawingName('');
  };

  const handleChange = event => {
    setDrawingName(event.target.value);
  };

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={drawingName}
          onChange={handleChange}
          placeholder="Drawing name"
          className="Form-drawingInput"
          required
        />
        <button type="submit" className="Form-button">
          Create
        </button>
      </form>
    </div>
  );
};

export default DrawingForm;
