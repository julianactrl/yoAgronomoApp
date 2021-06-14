import './App.css';
import React from 'react';
import {useSelector} from 'react-redux'
import Routes from './Routes.js';
import {AnimatePresence} from 'framer-motion'
import Weather from './components/Weather/Weather'

function App() {
  return (
    <AnimatePresence>
    <div className="App">
      <Routes />
    </div>
    </AnimatePresence>
  );
}

export default App;
