import './App.css';
import React from 'react';
import {useSelector} from 'react-redux'
import Routes from './Routes.js';
import Weather from './components/Weather/Weather'

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
