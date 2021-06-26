import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTransporte} from '../../redux/actions/transporteActions'
import styles from './styles.module.css'
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import axios from 'axios'



function DetailTransporte (props) {
    
    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id);
    const transporte = useSelector(state=>state.transporteReducer.allTransporte);
    console.log("el consolelogee", transporte)




    
    useEffect(()=> {
        dispatch(getTransporte(1));
    }, []);
    

 

    return (
       <div>
           {transporte.map(transport=>(
               <div>
                   <h1>{transport.patente}</h1>
                   <p>{transport.conductor}</p>
                   <p>{transport.carga}</p>
                   <p>{transport.fechaEntrada}</p>
                   <p>{transport.fechaSalida}</p>
                   <p>{transport.observaciones}</p>
               </div>
               
           ))}
           <Link to={"/updatetransporte/:id"}>Update</Link>
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