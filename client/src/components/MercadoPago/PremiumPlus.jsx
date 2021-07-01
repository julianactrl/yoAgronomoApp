import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import '../MercadoPago/MercadoPago.css'
import { useSelector } from "react-redux";

const FORM_ID = 'payment-form';


const { REACT_APP_API} = process.env


export default function MercadoPago() {
  const id = useSelector((state) => state.userReducer.userInfo.user.id);
   

  const [preferenceId, setPreferenceId] = useState(null);
  const [linkMp, setLinkMp] = useState(null);
  
  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post(`${ REACT_APP_API}/premium/mp/${id}`, {
        "totalPrice": 499,
        "title": "YoAgronomo Premium"
    } ).then((order) => {
    setPreferenceId(order.data.preferenceId);
    setLinkMp(order.data)
      
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
    <Header/>
      <div className='MpContainer'>
       <div className='membresiaPremiumPlus'>
        <h2 className='h2Mp'><strong>Membresia Premium Plus</strong></h2>
        <h3 className='h3Mp'>Obteniendo esta membresia accedes a estos beneficios</h3>
        <ul className='ulMp'>
          <li>Capacidad de cargar hasta 10 empresas.</li>
          <li>Carga hasta 10 lotes por empresa.</li>
          <li>Podrás gestionar de 500 a 1000 hectáreas.</li>
        </ul>
        <h5 className='h5Mp'>Además de todos los beneficios que te contamos, podrás colaborar con nosotros!</h5>
        <h4 className='h4Mp'>Costo total: $499 ARS</h4>
        <a href={linkMp}>
            <button className='btnPagar'>Pagar</button>
        </a>
      </div>
      </div>
      </>
  )
}