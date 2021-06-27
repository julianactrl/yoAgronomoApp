import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../MercadoPago/MercadoPago.css'
import Header from '../Header/Header';
const FORM_ID = 'payment-form';

export default function MercadoPago(props) {

  return (
    <>
          {/* <a style={{"margin-top": "100px"}} id={FORM_ID} href={linkMp}>
          </a> */}
          {/* <a href={linkMp}>
            <button >
              PAGA GIL
            </button>

          </a> */}
          <Header />
      <div className='MpContainer'>
      <div className='membresiaPremium'>
        <h2 className='h2Mp'>Membresia Premium</h2>
        <Link to='/membresia/premium'>
          <button className='masInfoBtn'>Ver mas información</button>
        </Link>
      </div>
      <div className='membresiaPremiumPlus'>
        <h2 className='h2Mp'>Membresia Premium Plus</h2>
        <Link to='/membresia/premiumplus'>
          <button className='masInfoBtn'>Ver mas información</button>
        </Link>
      </div>
      <div className='membresiaPremiumPro'>
        <h2 className='h2Mp'>Membresia Premium Pro</h2>
        <Link to='/membresia/premiumpro'>
          <button className='masInfoBtn'>Ver mas información</button>
        </Link>
      </div>
    </div>
    </>
  );
}
