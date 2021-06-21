import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import '../MercadoPago/MercadoPago.css'
import Header from '../Header/Header';
const FORM_ID = 'payment-form';

export default function MercadoPago(props) {
   

  const [preferenceId, setPreferenceId] = useState(null);
  const [linkMp, setLinkMp] = useState(null);
  
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post('http://localhost:3001/premium/checkout/1', {
        "totalPrice": 299,
        "title": "YoAgronomo Premium"
    } ).then((order) => {
        console.log("dddd",order)  
    setPreferenceId(order.data.preferenceId);
    setLinkMp(order.data.url)
      
    });
  }, []);
  

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
      script.setAttribute('data-preference-id', preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);
  console.log(linkMp)

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
        <h2>Membresia Premium</h2>
        <Link to='/membresia/premium'>
          <button className="mpBoton">Ver mas información</button>
        </Link>
      </div>
      <div className='membresiaPremiumPlus'>
        <h2>Membresia Premium Plus</h2>
        <Link to='/membresia/premiumplus'>
          <button className="mpBoton">Ver mas información</button>
        </Link>
      </div>
      <div className='membresiaPremiumPro'>
        <h2>Membresia Premium Pro</h2>
        <Link to='/membresia/premiumpro'>
          <button className="mpBoton">Ver mas información</button>
        </Link>
      </div>
    </div>
    </>
  );
}
