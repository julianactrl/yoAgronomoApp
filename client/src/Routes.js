import React from "react";
import { Route, Switch,Link } from "react-router-dom";
import LandingPage from './components/LandingPage/index.js';
import Weather from './components/Weather/Weather.jsx';
import NewEmpresa from './components/NewEmpresa/NewEmpresa.js';
import DetailEmpresa from './components/DetailEmpresa/DetailEmpresa.js';
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import News from './components/News/News.js';


export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route exact path='/empresa'>
      <DetailEmpresa />
      </Route>
      <Route exact path='/newempresa'>
        <NewEmpresa />
      </Route>
      <Route  path="/weather">
        <Weather />
      </Route>
      <Route exact path='/news'>
        <News />
      </Route>


    </Switch>
    );
  }

      