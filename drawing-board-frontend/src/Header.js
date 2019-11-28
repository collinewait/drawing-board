import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className="App-header">
    <h2>
      <Link to="/" className="Header-link">
        Drawing board
      </Link>
    </h2>
  </div>
);

export default Header;
