import React from "react";
import { Route, Switch } from "react-router-dom";
import DetailEmpresa from './components/DetailEmpresa/DetailEmpresa';
import NewEmpresa from './components/NewEmpresa/NewEmpresa'
import LandingPage from './components/LandingPage

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
      <LandingPage />
      </Route>
      
      <Route exact path='/empresa'>
      <DetailEmpresa />
      </Route>
      <Route exact path='/newempresa'>
        <NewEmpresa />
      </Route>
    </Switch>
    );
  }

      