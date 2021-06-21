import './App.css';
import React from 'react';
import {useSelector} from 'react-redux'
import Routes from './Routes.js';
import {AnimatePresence} from 'framer-motion'
import Weather from './components/Weather/Weather'


console.log(process.env.REACT_APP_WEATHER_API_KEY)
console.log(process.env.REACT_APP_NEWS_API_KEY)
console.log(process.env.REACT_APP_GOOGLE_API_KEY)

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
