import Header from '../Header/Header'
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../MercadoPago/MercadoPago.css'
const FORM_ID = 'payment-form';

const { REACT_APP_API, REACT_APP_API_HEROKU} = process.env


export default function MercadoPago(props) {
   

  const [preferenceId, setPreferenceId] = useState(null);
  const [linkMp, setLinkMp] = useState(null);
  
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post(`${REACT_APP_API}/premium/checkout/`, {
        "totalPrice": 999,
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
  return(
    <>
        <Header />
      <div className='MpContainer'>
        <div className='membresiaPremiumPro'>
        <h2 className='h2Mp'><strong>Membresia Premium Pro</strong></h2>
        <h3 className='h3Mp'>Obteniendo esta membresia accedes a estos beneficios</h3>
        <ul className='ulMp'>
          <li>Capacidad de cargar mas de 10 empresas.</li>
          <li>Carga mas de 10 lotes por empresa.</li>
          <li>Podrás gestionar mas de 1000 hectáreas sin límites!</li>
          </ul>
        <h5 className='h5Mp'>Además de todos los beneficios que te contamos, podrás colaborar con nosotros!</h5>
        <h4 className='h4Mp'>Costo total: $999 ARS</h4>
        <a href={linkMp}>
            <button className='btnPagar'>Pagar</button>
        </a>
      </div>
      </div>
    </>
  )
}