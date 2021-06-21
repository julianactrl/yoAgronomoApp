import Header from '../Header/Header'
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../MercadoPago/MercadoPago.css'
const FORM_ID = 'payment-form';

export default function MercadoPago(props) {
   

  const [preferenceId, setPreferenceId] = useState(null);
  const [linkMp, setLinkMp] = useState(null);
  
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post('http://localhost:3001/premium/checkout/', {
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
        <h2><strong>Membresia Premium Pro</strong></h2>
        <h3>Obteniendo esta membresia accedes a estos beneficios</h3>
        <ul>
          <li>Capacidad de cargar mas de 10 empresas.</li>
          <li>Carga mas de 10 lotes por empresa.</li>
          <li>Podrás gestionar mas de 1000 hectáreas sin límites!</li>
        </ul>
        <h5>Además de todos los beneficios que te contamos, podrás colaborar con nosotros!</h5>
        <h4>Costo total: $999 ARS</h4>
      </div>
        <a className='btnPagar' href={linkMp}>
            <button>Pagar</button>
        </a>
      </div>
      </>
  )
}