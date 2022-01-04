import React , { useState } from 'react';

import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  
  return (
    <div className="App">
      <h1 className='px-4 pt-4 ml-3'>Waterflow simulator</h1>
      <Dashboard/>
    </div>
  );
}

export default App;
