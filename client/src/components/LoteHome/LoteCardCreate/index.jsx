import React, { useEffect } from 'react'
import styles from './styles.module.css'
import add from '../../../assets/añadir.png';
import { useDispatch, useSelector } from 'react-redux';


export default function LoteCardCreate () {
    const dispatch = useDispatch()

    function aux () {
        dispatch({type:'SET_VERIFY',payload:'formularioCrear'})
    }

    return (
        <div  className={styles.cardContAdd} onClick={aux}>
            <h1 className={styles.titleAdd}>Agregar Lote</h1>
            <img src={add} alt="" className={styles.imgAdd}/>
        </div> 
    )
}