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
    axios.post('http://localhost:3002/premium/checkout', {
        "totalPrice": 100,
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

  return (
      <div>
          <a id={FORM_ID} href={linkMp}>
          </a>
      </div>
  );
}