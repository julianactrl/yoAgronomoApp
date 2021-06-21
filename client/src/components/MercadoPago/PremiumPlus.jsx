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
        "totalPrice": 499,
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
      <div className='MpContainer'>
       <div className='membresiaPremiumPlus'>
        <h2>Membresia Premium Plus</h2>
        <h3>Obteniendo esta membresia accedes a estos beneficios</h3>
        <ul>
          <li>Capacidad de cargar hasta 10 empresas.</li>
          <li>Carga hasta 10 lotes por empresa.</li>
          <li>Por cada lote que tenga tu empresa, podrás cargar de 500 - 1000 hectáreas.</li>
        </ul>
        <h5>Además de todos los beneficios que te contamos, podrás colaborar con nosotros!</h5>
        <h4>Costo total: $499 ARS</h4>
      </div>
        <a className='btnPagar' href={linkMp}>
            <button>Pagar</button>
        </a>
      </div>
  )
}