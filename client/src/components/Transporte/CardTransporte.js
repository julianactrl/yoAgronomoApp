import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTransporte} from '../../redux/actions/transporteActions'
import styles from './styles.module.css'
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import add from '../../assets/añadir.png';

 



function DetailTransporte (props) {
    
    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id);
    const transporte = useSelector(state=>state.transporteReducer.allTransporte);
    
    useEffect(()=> {
        dispatch(getTransporte(empresaId));
    }, []);

    return (
       <div className={styles.divtotal}>
           <Header />

           <div className={styles.page}>
                <Link to={"/createtransporte"}>
                        <div  className={styles.cardContAdd} >
                            <h1 className={styles.titleAdd}>Agregar Transporte</h1>
                            <img src={add} alt="" className={styles.imgAdd}/>
                        </div>
                </Link>
                <div className={styles.containerTransporte}>
                {transporte && transporte.map(transport=>(
                    <div className={styles.transporte}>
                        <h3 className={styles.items} >Patente: {transport.patente}</h3>
                        <h3 className={styles.items} >Conductor: {transport.conductor}</h3>
                        <h3 className={styles.items} >Carga: {transport.carga}</h3>
                        <h3 className={styles.items} >Fecha de entrada: {transport.fechaEntrada}</h3>
                        <h3 className={styles.items} >Fecha de salida: {transport.fechaSalida}</h3>
                        <h3 className={styles.items} >Observaciones: {transport.observaciones}</h3>
                        <Link className={styles.editar} to={`/updatetransporte/${transport.id}`}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </Link>
                    </div>
                ))}
                </div>
           </div>
       </div>
    //   <div className={styles.background}>
    //         <Header />
                 
    //     { <div className={styles.div}>
    //       <li className={styles.liContenedor}>
    //         <div className={styles.name}>
    //        <div className={styles.items}>
                    
    //         <Link to={`/updatetransporte/${transporte.id}`}>
    //            <button className={styles.buttonEmpresa}></button>
    //         </Link>
    //       <div className={styles.items}>
    //         <Link to={`/home`}>
    //            <button onClick={()=>deleteTransporte(transporteId)} className={styles.eliminarEmpresa}></button> 
    //         </Link>
    //       </div>
    //          </div>
    //          </div>
    //            <div className={styles.caja}>
    //            <div className={styles.description}>
    //             <h2> Patente: {transporte.patente}</h2>
    //             <h2 className={styles.ubicacion}>Conductor: {transporte.conductor}</h2>
    //             <h2 className={styles.ubicacion}>Carga: {transporte.carga}</h2>
    //             <h2 className={styles.ubicacion}>Fecha de Entrada: {transporte.fechaEntrada}</h2>
    //             <h2 className={styles.ubicacion}>Fecha de Salida: {transporte.fechaSalida}</h2>
    //             <h2 className={styles.ubicacion}>Observaciones: {transporte.observaciones}</h2>
    //            </div>
    //            </div>
            
    //         </li>
          
    //     </div>}

    //    </div>
    
    
     
    )
}

export default DetailTransporte;