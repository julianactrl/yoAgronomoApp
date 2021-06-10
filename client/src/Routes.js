import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from './views/LandingPage';
import DetailEmpresa from './components/DetailEmpresa/DetailEmpresa';
import NewEmpresa from './components/NewEmpresa/NewEmpresa'

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

      