import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa, deleteEmpresa} from '../../redux/actions/empresaActions';
import { getAllTareas,resetTareas } from '../../redux/actions/calendarActions';
import styles from './styles.module.css'
import Header from '../Header/Header';
import data from './data.json';
import {Link} from 'react-router-dom';
import campo from './campo.jpg'
import axios from 'axios'
import { useHistory} from 'react-router';
import { motion } from 'framer-motion';

const { REACT_APP_API } = process.env;

function DetailEmpresa ({id}) {

  const history= useHistory();
  const idEmpresa = useSelector(state => state.empresaReducer.empresaForId.id)  
    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    const tareas = useSelector(state=>state.calendarReducer.tareas);
    
    useEffect(()=> {
      dispatch(getEmpresa(id));
      console.log(empresa)
      dispatch(resetTareas())
      
  }, []);


   function handleAgenda(e){
     e.preventDefault();
     dispatch(getAllTareas(idEmpresa))
   }
  
    function deleteEmpresa(id) {
        
        // dispatch(deleteEmpresa(id));
        axios.delete(`${REACT_APP_API}/empresa/delete/${id}`)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
        alert('Su empresa fue eliminada!')
        
        
    }

    return (
       <motion.div
      initial='hidden'
      animate='visible'
      variants={{
      hidden: {
          scale: .8,
          opacity: -1
      },
      visible: {
          scale: 1,
          opacity: 1,
          transition:{
              delay: .002
          }
      }
      }}
      >
        <div className={styles.background}>
            <Header />
            
                
            { <div className={styles.div}>
            <li className={styles.liContenedor}>
            <div className={styles.name}>
                <div className={styles.itemsTop}>
            <h1 className={styles.nameTitle}>{empresa.name}</h1>
            <div className={styles.btnsDelEdit}>
            <Link to={`/update/${empresa.id}`}>
            <button className={styles.buttonEmpresa}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            </Link>
            <div className={styles.items}>
            <Link to={`/home`}>
            <button onClick={()=>deleteEmpresa(id)} className={styles.eliminarEmpresa}><i class="fa fa-trash-o" aria-hidden="true"></i></button> 
            </Link>  
            </div>
            </div>
            </div>
            </div>
            <div className={styles.caja}>
            <div className={styles.description}>
            <h2 className={styles.malditoH2}><i class="fa fa-area-chart" aria-hidden="true"></i> Hectáreas totales: {empresa.hectareas}</h2>
            <h2 className={styles.malditoH2}><i class="fa fa-map-marker" aria-hidden="true"></i> Ubicación: {empresa.ubicacion}</h2>
            <h2 className={styles.agendita}><i class="fa fa-calendar" aria-hidden="true"></i> <button className={styles.agenda} onClick={e=> handleAgenda(e)}>Ver Agenda</button> </h2>
            <div className={styles.tareas}>
            <div className={styles.items}>
            <div className={styles.items}>
          
           </div> 
              <Link className={styles.elLink} to ='/tareas'>
           <div className={styles.items}>
           <h3> { tareas.length>0 && tareas.map(t=>(
                           <p className={styles.eachTarea}><i class="fa fa-check" aria-hidden="true"></i>{t.tarea}</p>
                           ))}</h3>
                           
           </div>
                           </Link>
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
        </motion.div>
    )
}

export default DetailEmpresa;