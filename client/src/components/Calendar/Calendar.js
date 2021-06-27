import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import {createTarea, getAllTareas, updateTarea, deleteTarea} from '../../redux/actions/calendarActions';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Header from '../Header/Header'
import {useHistory} from 'react-router-dom'
import { motion } from 'framer-motion';


function Calendar(){

// const {id} = useParams()
const idEmpresa = useSelector(state => state.empresaReducer.empresaForId.id)    

useEffect(()=>{
    dispatch(getAllTareas(idEmpresa))
}, [])

const dispatch = useDispatch();
const history = useHistory();

const [tarea, setTarea] = useState({
    empresaId: idEmpresa,
    tarea:'',
    fecha:'',
});

function handleInputChange(e) {
    setTarea({
        ...tarea,                        
         [e.target.name]: e.target.value,  
        });
        console.log(tarea)
}

function handleSubmit(e) {
    e.preventDefault();
    console.log(tarea)
    dispatch(createTarea(tarea))
    history.push(`/empresa/${idEmpresa}`)
        
}

const tareasEmpresa = useSelector((state) => state.calendarReducer.tareas);


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
    <div >
        <Header/>
                <h1 className={styles.tareas}>Tareas a realizar</h1>
        

    <form className={styles.estilosForm} onSubmit={handleSubmit} >
    <div>
        <label>Tarea: </label>
        <input 
        type='text'
        onChange={(e)=>handleInputChange(e)} 
        value={tarea['tarea']}
        placeholder='Tarea a realizar...'
        name='tarea'/>
    </div>
    <div>
        <label>Fecha: </label>
        <input
        type='date'
        onChange={(e)=>handleInputChange(e)} 
        value={tarea['fecha']}
        placeholder='2021-07-22'
        name='fecha'/>
    </div>
    <div>
              { tarea.fecha && tarea.tarea && tarea.empresaId ?
               <button className={styles.buttonTarea} type='submit' value='Agendar Tarea' name="Enviar">Agendar Tarea</button> : <button type='button' className={styles.disabledButton}>
                  Agendar Tarea
                </button>
              }
            </div>
     
     </form>
     <br></br>
     <div className={styles.datatableContainer}>
               
               <table className={styles.datatable}>
                   <thead>
                       <tr>
                           <th>
                           <h2 className={styles.tablita}>Tarea <br/> 
                           {tareasEmpresa.length >0 && tareasEmpresa.map(t=>(
                           <p>{t.tarea}</p> 
                           )) }</h2></th>
                           <th>
                           <h2 className={styles.tablita}>Fecha <br/> 
                           { tareasEmpresa.length>0 && tareasEmpresa.map(t=>(
                           <p>{t.fecha}</p>
                           ))}</h2>
                           </th>
                           
                       </tr>
                   </thead>
               </table>
           </div>
     </div>
     </motion.div>
)
}

export default Calendar;