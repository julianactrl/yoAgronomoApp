import React from 'react'
import { Link } from "react-router-dom";
import '../GestionComercial/GestionComercial.css';
import Header from '../Header/Header';
export const GestionComercial = () => {
    const empresaId = window.location.pathname.split('/')[2]
    return (
             <>
            <Header />
            <div className='gestionComercialCont'>
                <div className='controlDeStock'>
                    <h2 className='h2Gestion'>Contol de Stock</h2>
                    <Link to={`/gestion_comercial/stock/${empresaId}`}>
                        <button className='masInfoBtnGestion'>Ver mas información</button>
                    </Link>
                </div>
                <div className='tansporteCont'>
                    <h2 className='h2Gestion'>Transporte</h2>
                    <Link to='/transporte'>
                        <button className='masInfoBtnGestion'>Ver mas información</button>
                    </Link>
                </div>
                <div className='proyeccionMenCont'>
                    <h2 className='h2Gestion'>Proyeccion Mensual</h2>
                    <Link to='/gestion_comercial/proyeccion'>
                        <button className='masInfoBtnGestion'>Ver mas información</button>
                    </Link>
                </div>
            </div>
            </>
    )
}

export default GestionComercial;
