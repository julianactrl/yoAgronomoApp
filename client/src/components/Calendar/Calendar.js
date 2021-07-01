import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import {createTarea, getAllTareas, updateTarea, deleteTarea, getTarea} from '../../redux/actions/calendarActions';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Header from '../Header/Header'
import {useHistory, Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import axios from 'axios'
import swal from 'sweetalert';
const { REACT_APP_API } = process.env;


function Calendar(){

// const {id} = useParams()
const idEmpresa = useSelector(state => state.empresaReducer.empresaForId.id)
const idTarea = useSelector(state => state.calendarReducer.tareaForId.id)    

useEffect(()=>{
    dispatch(getAllTareas(idEmpresa))
    // dispatch(getTarea(idTarea))
}, [])

const dispatch = useDispatch();
const history = useHistory();

const [tarea, setTarea] = useState({
    empresaId: idEmpresa,
    tarea:'',
    fecha:'',
    prioridad:''
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
function deleteTarea(id) {
    console.log(id)
    // dispatch(deleteTarea(idTarea));
    axios.delete(`${REACT_APP_API}/tareas/delete/${id}`)
    .then(response => console.log(response.data)) 
    .catch(error  => console.log(error))
    swal("Tarea eliminada", { icon: "success" });
    
    
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
    <br></br>
    <div >
        {/* <label>Prioridad: </label> */}
        <select className={styles.select} name='prioridad' onChange={(e)=>handleInputChange(e)}>
            <option value=''> Selecciona Prioridad </option>
            <option value='Alta'>Alta</option>
            <option value='Media'>Media</option>
            <option value='Baja'>Baja</option>
        </select>
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
                           <th><h2 className={styles.tablita}>Tarea</h2></th>
                           <th><h2 className={styles.tablita}>Fecha</h2></th>
                           <th><h2 className={styles.tablita}>Prioridad</h2></th>
                           <th></th>
                       </tr>
                   </thead>
                   <tbody>
                       { tareasEmpresa.length >0 && tareasEmpresa.map(t=>(
                       <tr>
                           <td><p className={styles.cadaTarea}>{t.tarea}</p></td>
                           <td><p className={styles.cadaTarea}>{t.fecha}</p></td>
                           <td><p className={styles.cadaTarea}>{t.prioridad}</p></td>
                           <td> <Link to={`/empresa/${idEmpresa}`}>
                            <button onClick={()=>deleteTarea(`${t.id}`)} className={styles.eliminarEmpresa}><i class="fa fa-trash-o" aria-hidden="true"></i></button> 
                            </Link> </td>
                            
                           
                       </tr>
                       ))
                       }
                   </tbody>
               {/* <thead>
                       <tr>
                           <th>
                           <h2 className={styles.tablita}>Tarea <br/> 
                           {tareasEmpresa.length >0 && tareasEmpresa.map(t=>(
                           <p>{t.tarea}</p> 
                           )) }</h2>
                           </th>
                           <th>
                           <h2 className={styles.tablita}>Fecha <br/> 
                           { tareasEmpresa.length>0 && tareasEmpresa.map(t=>(
                           <p>{t.fecha}</p>
                           ))}</h2>
                           </th>
                           <th>
                           <h2 className={styles.tablita}> <br/> 
                           { tareasEmpresa.length>0 && tareasEmpresa.map(t=>(
                             
                             <Link to={`/home`}>
                             <button onClick={()=>deleteTarea(`${t.id}`)} className={styles.eliminarEmpresa}></button> 
                             </Link>
                              
                               ))}</h2>
                          
                           </th>
                       </tr>
                   </thead> */}
               </table>
           </div>
     </div>
     </motion.div>
)
}

export default Calendar;