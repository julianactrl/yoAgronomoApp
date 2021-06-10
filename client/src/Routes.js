import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from './views/LandingPage'
import Weather from './components/Weather/Weather'

export default function Routes() {
  return (
    <Switch>

      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route  path="/weather">
        <Weather />
      </Route>
      
    </Switch>
  );
}