import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../GestionComercial/GestionComercial.css';
import Header from '../Header/Header';
export const GestionComercial = () => {
    const empresaId = useSelector(state => state.empresaReducer.empresaForId.id)
    return (
             <>
            <Header />
            <div className='gestionComercialCont'>
                <div className='controlDeStock'>
                    <h2 className='h2Gestion'>Control de Stock</h2>
                    <Link to={`/gestion_comercial/stock/${empresaId}`}>
                        <button className='masInfoBtnGestion'>Ver más información</button>
                    </Link>
                </div>
                <div className='tansporteCont'>
                    <h2 className='h2Gestion'>Transporte</h2>
                    <Link to='/transporte'>
                        <button className='masInfoBtnGestion'>Ver más información</button>
                    </Link>
                </div>
            </div>
            </>
    )
}

export default GestionComercial;
