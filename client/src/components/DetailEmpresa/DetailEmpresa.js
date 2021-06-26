import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa, deleteEmpresa} from '../../redux/actions/empresaActions';
import { getAllTareas } from '../../redux/actions/calendarActions';
import styles from './styles.module.css'
import Header from '../Header/Header';
import data from './data.json';
import {Link} from 'react-router-dom';
import campo from './campo.jpg'
import axios from 'axios'

const { REACT_APP_API } = process.env;

function DetailEmpresa ({id}) {


  const idEmpresa = useSelector(state => state.empresaReducer.empresaForId.id)  
    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    // const tareas = useSelector(state=>state.calendarReducer.tareas);
    
    useEffect(()=> {
      dispatch(getEmpresa(id));
      console.log(empresa.imagen)
      
  }, []);

  //   useEffect(()=>{
  //     dispatch(getAllTareas(idEmpresa))
  // }, [])
    
    function deleteEmpresa(id) {
        
        // dispatch(deleteEmpresa(id));
        axios.delete(`${REACT_APP_API}/empresa/delete/${id}`)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
        alert('Su empresa fue eliminada!')
        
        
    }

    return (
        <div className={styles.background}>
            <Header />
            
                
            { <div className={styles.div}>
            <li className={styles.liContenedor}>
            <div className={styles.name}>
                <div className={styles.itemsTop}>
            <h1 className={styles.nameTitle}>{empresa.name}</h1>
            <div className={styles.btnsDelEdit}>
            <Link to={`/update/${empresa.id}`}>
            <button className={styles.buttonEmpresa}></button>
            </Link>
            <div className={styles.items}>
            <Link to={`/home`}>
            <button onClick={()=>deleteEmpresa(id)} className={styles.eliminarEmpresa}></button> 
            </Link>  
            </div>
            </div>
            </div>
            </div>
            <div className={styles.caja}>
            <div className={styles.description}>
            <h2>📏 Hectáreas totales: {empresa.hectareas}</h2>
            <h2 className={styles.ubicacion}>📍 Ubicación: {empresa.ubicacion}</h2>
            <h2>📝 Tareas a realizar:</h2>
            <div className={styles.tareas}>
            <div className={styles.items}>
            <div className={styles.items}>
           <h3 style={{color: "green"}}>▶</h3>
           </div> 
           {/* <div className={styles.items}>
           <h3> { tareas.length>0 && tareas.map(t=>(
                           <p>{t.tarea}</p>
                           ))}</h3>
           </div> */}
           </div>
            </div>
            </div>
            {empresa.imagen ? (
            <img
              src={`${REACT_APP_API}/empresa/imagen/${empresa.imagen}`}
              alt="https://i.stack.imgur.com/y9DpT.jpg"
              width={500}
              height={350}
              className={styles.imgEmpresa}
            />
          ) : (
            <img
              alt="perfil"
              src={
                "https://blog.nutri-tech.com.au/content/images/2021/04/Crop---soybeans.jpg"
              }
              className={styles.imgEmpresa}
            />
          )}
            </div>
            </li>

            </div> }

            
        
    
        </div>
    )
}

export default DetailEmpresa;