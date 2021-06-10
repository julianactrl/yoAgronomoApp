import React from "react";
import { Route, Switch } from "react-router-dom";
import DashBoard from "./components/DashBoard/DashBoard";
import LandingPage from './views/LandingPage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/home">
        <DashBoard />
      </Route>
    </Switch>
  );
}