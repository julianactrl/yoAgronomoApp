import './App.css';
import React from 'react';
import {useSelector} from 'react-redux'
import Routes from './Routes.js';
import Weather from './components/Weather/Weather'

function App() {
  const clima = useSelector(state => state.weather)
  console.log("EEASDASDAS",clima)
  return (
    <div className="App">
      Yo Agronomo
      <Weather />
      <Routes />
    </div>
  );
}

export default App;
