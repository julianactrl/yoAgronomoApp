import React, { useEffect } from 'react'
import styles from './styles.module.css'
import add from '../../../assets/añadir.png';
import { useDispatch, useSelector } from 'react-redux';


export default function LoteCardCreate () {
    const renderFormCreateLote = useSelector(state=> state.loteReducer.renderFormCreateLote)
    const dispatch = useDispatch()

    const aux = async() => {
        await dispatch({type:'GET_FORM_LOTE',payload:true});
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaa',renderFormCreateLote)
        // await dispatch({type:'GET_DETAIL_LOTE',payload:true})
    }

    return (
        <div  className={styles.cardContAdd} onClick={aux}>
            <h1 className={styles.titleAdd}>Agregar Lote</h1>
            <img src={add} alt="" className={styles.imgAdd}/>
        </div> 
    )
}