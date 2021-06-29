import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getDolar} from '../../redux/actions/cotizacionesActions'
import styles from './styles.module.css'
import Header from '../Header/Header'

function Cotizaciones() {

    
    
const dispatch = useDispatch()
const cotizaciones = useSelector(state => state.cotizacionesReducer.cotizaciones)

useEffect(() => {
    dispatch(getDolar())
    
    
},[]) 
const fecha = new Date()

    return (
        <div>
            <Header/>
            <h1 className={styles.dolarHoy}>Dolar hoy {fecha.toLocaleDateString()}</h1>
        <div className={styles.datatableContainer}>
                   
            <table className={styles.datatable}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Moneda</th>
                        <th>Compra</th>
                        <th>Venta</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            cotizaciones.map(i=>(
                    <tr>
                        <td></td>
                        
                        <td>{i.casa.nombre}</td>
                        <td>{i.casa.compra}</td>
                        <td>{i.casa.venta}</td>
                    </tr>
                    ))
                } 
                </tbody>
            </table>
        </div>
        </div>
    )
}
export default Cotizaciones;