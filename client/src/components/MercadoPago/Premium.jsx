import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
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
  return(
    <>
    <Header />
      <div className='MpContainer'>
        <div className='membresiaPremium'>
        <h2 className='h2Mp'><strong>Membresia Premium</strong></h2>
        <h3 className='h3Mp'>Obteniendo esta membresia accedes a estos beneficios</h3>
        <ul className='ulMp'>
        <li>Capacidad de cargar hasta 6 empresas.</li>
        <li>Carga hasta 6 lotes por empresa.</li>
        <li>Gestionar entre 300 - 500 hectáreas.</li>
        </ul>
        <h5 className='h5Mp'>Además de todos los beneficios que te contamos, podrás colaborar con nosotros!</h5>
        <h4 className='h4Mp'>Costo total: $299 ARS</h4>
        <a href={linkMp}>
            <button className='btnPagar'>Pagar</button>
        </a>
        </div>
      </div>
      </>
  )
}