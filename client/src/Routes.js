import React from "react";
import DashBoard from "./components/DashBoard/DashBoard";
import { Route, Switch, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage/index.js";
import Weather from "./components/Weather/Weather.jsx";
import NewEmpresa from "./components/NewEmpresa/NewEmpresa.js";
import DetailEmpresa from "./components/DetailEmpresa/DetailEmpresa.js";
import IntroPage from "./components/IntroPage/IntroPage.jsx";
import News from "./components/News/News.js";
import UpdateEmpresa from "./components/UpdateEmpresa/UpdateEmpresa";
import UpdateProfile from "./components/UpdateProfile/updateProfile";

import LoteHome from "./components/LoteHome";
import AgroConsultas from "./components/AgroConsultas/AgroConsultas";
import Map from "./components/Map/Map.js";
import Cotizaciones from "./components/Cotizaciones/Cotizaciones";
import MercadoPago from "./components/MercadoPago/MercadoPago.jsx";
import PremiumPlus from "./components/MercadoPago/PremiumPlus.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import GestionGastos from "./components/GestionComercial/GestionGastos";

import NewTransporte from "./components/Transporte/CreateTransporte";
import UpdateTransporte from "./components/Transporte/UpdateTransporte";
import DetailTransporte from "./components/Transporte/CardTransporte";
import Calendar from "./components/Calendar/Calendar";
import GestionComercial from "./components/GestionComercial/GestionComercial.js";
import Stock from "./components/GestionComercial/Stock.js";
// --------- PASSWORD RESET ---------------------------------------------
import { ResetPassword } from "./components/PasswordReset";
import AgroApi from "./components/AgroApi/AgroApi";
import DetailTarea from './components/Calendar/DetailTarea'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <IntroPage />
      </Route>
      <Route path="/index">
        <LandingPage />
      </Route>
      <Route exact path="/resetpassword" component={ResetPassword} />
      {/* <Route exact path='/empresa'>
      <DetailEmpresa />
      </Route> */}
      <Route
        exact
        path="/empresa/:id"
        render={({ match }) => <DetailEmpresa id={match.params.id} />}
      />
      <Route
        exact
        path="/update/:id"
        render={({ match }) => <UpdateEmpresa id={match.params.id} />}
      />
      <PrivateRoute component={NewEmpresa} path="/newempresa" exact />
      <PrivateRoute component={AgroConsultas} path="/agroconsultas" exact />
      <PrivateRoute component={Cotizaciones} path="/mercados" exact />
      <PrivateRoute component={DashBoard} path="/home" exact />

      <Route
        exact
        path="/user/update/:id"
        render={({ match }) => <UpdateProfile id={match.params.id} />}
      ></Route>

      <Route exact path="/lote/:id">
        <LoteHome id={window.location.pathname.split("/")[2]} />
      </Route>

  
      <PrivateRoute component={Weather} path="/weather" exact />
      <Route exact path="/news">
        <News />
      </Route>
      <Route exact path="/map">
        <Map />
      </Route>

      <PrivateRoute component={MercadoPago} path="/membresia" exact />

      <Route exact path="/membresia/premiumplus">
        <PremiumPlus />
      </Route>

      <Route exact path="/createtransporte">
        <NewTransporte />
      </Route>

      <Route
        exact
        path="/updatetransporte/:id"
        render={({ match }) => <UpdateTransporte id={match.params.id} />}
      ></Route>

      <PrivateRoute component={DetailTransporte} path="/transporte" exact />
      <PrivateRoute component={Calendar} path="/tareas" exact />

      <Route exact path="/transporte">
        <DetailTransporte />
      </Route>

      <Route exact path="/tareas">
        <Calendar />
      </Route>
     
      <Route exact path="/gestion_comercial/:id">
        <GestionComercial />
      </Route>
      <Route
        exact
        path="/gestion_comercial/stock/:id"
        render={({ match }) => <Stock id={match.params.id} />}
      ></Route>
      <Route exact path="/agroapi">
        <AgroApi />
      </Route>

      <Route
        exact path="/tareas/:id"
        render={({ match }) => <DetailTarea
         id={match.params.id} />}/>
    </Switch>
  );
}
