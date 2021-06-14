import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa, deleteEmpresa} from '../../redux/actions/empresaActions';
import styles from './styles.module.css'
import Header from '../Header/Header';
import data from './data.json';
import {Link} from 'react-router-dom';
import campo from './campo.jpg'
import axios from 'axios'



function DetailEmpresa ({id}) {

    const dispatch = useDispatch();
    // const {id} = props.match.params;
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    
    useEffect(()=> {
        dispatch(getEmpresa(id));
        
    }, []);
    
    function deleteEmpresa(id) {
        
        // dispatch(deleteEmpresa(id));
        axios.delete(`http://localhost:3001/empresa/delete/${id}`)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
        alert('Su empresa fue eliminada!')
        
            
    }

    return (
        <div className={styles.background}>
            <Header />
            
                     
            
                
            { <div className={styles.div}>
            <li className={styles.liContenedor}>
            <h1 className={styles.name}>{empresa.name}</h1>
            <div className={styles.name}>
                <div className={styles.items}>
                    
            <Link to={`/update/${empresa.id}`}>
            <button className={styles.buttonEmpresa}>✏️ Editar</button>
            </Link>
            <div className={styles.items}>
            <Link to={`/home`}>
            <button onClick={()=>deleteEmpresa(id)} className={styles.eliminarEmpresa}>Eliminar</button> 
            </Link>
            </div>
            </div>
            </div>
            <div className={styles.caja}>
            <div className={styles.description}>
            <h3>📏Hectáreas totales: {empresa.hectareas}</h3>
            <h3 className={styles.ubicacion}>📍Ubicación: {empresa.ubicacion}</h3>
            <h2>📝Tareas a realizar:</h2>
            <div className={styles.tareas}>
            <div className={styles.items}>
            <div className={styles.items}>
           <h3 style={{color: "red"}}>▶</h3>
           </div> 
           <div className={styles.items}>
           <h3> Monitoreo de lotes</h3>
           </div>
           </div>
           <div className={styles.items}>
            <div className={styles.items}>
           <h3 style={{color: "yellow"}}>▶</h3>
           </div>
           <div className={styles.items}>
            <h3>Diagramación de plan de siembra</h3>
            </div>
            </div>
            <div className={styles.items}>
            <div className={styles.items}>
            <h3 style={{color: "green"}}>▶</h3>
            </div>
            <div className={styles.items}>
            <h3>Formulación de aplicaciones</h3>
            </div>
           
            </div>
            </div>
            </div>
           {
               empresa.imagen ? 
               <img width={500} height={350} src={empresa.imagen} alt='imagen del campo' className={styles.imgEmpresa}/>
               :
               <img width={500} height={350} src="https://blog.nutri-tech.com.au/content/images/2021/04/Crop---soybeans.jpg" alt="imagen default" className={styles.imgEmpresa} />
           }
            </div>
            </li>

            </div> }
        
    
        </div>
    )
}

export default DetailEmpresa;