import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

import React from 'react';




function App() {
  return (
    <div>
        <header>
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
        </header>
      <Outlet />
    </div>
  );
}

export default App;
