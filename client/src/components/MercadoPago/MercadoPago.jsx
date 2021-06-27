import React from "react";
import { Link } from "react-router-dom";
import "../MercadoPago/MercadoPago.css";
import Header from "../Header/Header";

export default function MercadoPago() {
  return (
    <>
      <Header />
      <div className="MpContainer">
        <div className="membresiaPremiumPlus">
          <h2 className="h2Mp">Membresia Premium Plus</h2>
          <Link to="/membresia/premiumplus">
            <button className="masInfoBtn">Ver mas información</button>
          </Link>
        </div>
      </div>
    </>
  );
}
