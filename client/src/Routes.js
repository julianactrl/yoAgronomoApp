
import React from "react";
import DashBoard from "./components/DashBoard/DashBoard";
import { Route, Switch,Link } from "react-router-dom";
import LandingPage from './components/LandingPage/index.js';
import Weather from './components/Weather/Weather.jsx';
import NewEmpresa from './components/NewEmpresa/NewEmpresa.js';
import DetailEmpresa from './components/DetailEmpresa/DetailEmpresa.js';
import IntroPage from "./components/IntroPage/IntroPage.jsx";
import News from './components/News/News.js';
import UpdateEmpresa from './components/UpdateEmpresa/UpdateEmpresa';

import LoteHome from "./components/LoteHome";
import AgroConsultas from "./components/AgroConsultas/AgroConsultas";




export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <IntroPage/>
      </Route>
      <Route path="/index">
        <LandingPage/>
      </Route>
      {/* <Route exact path='/empresa'>
      <DetailEmpresa />
      </Route> */}
      <Route
        exact path="/empresa/:id"
        render={({ match }) => <DetailEmpresa
         id={match.params.id} />}/>
        <Route
        exact path="/update/:id"
        render={({ match }) => <UpdateEmpresa
         id={match.params.id} />}/>
      <Route exact path='/newempresa'>
        <NewEmpresa />
      </Route>

      <Route exact path="/home">
        <DashBoard />
      </Route>

      <Route exact path='/lote/:id'>
        <LoteHome id={window.location.pathname.split('/')[2]} />
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
