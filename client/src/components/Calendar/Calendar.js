import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";
import {createTarea, getAllTareas, updateTarea, deleteTarea} from '../../redux/actions/calendarActions';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

function Calendar(){

const {id} = useParams()    

// useEffect(()=>{
//     dispatch(getAllTareas(id))
// }, [])

const dispatch = useDispatch();

const [tarea, setTarea] = useState({
    empresaId: id,
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
        
}

const tareasEmpresa = useSelector((state) => state.calendarReducer.tareas);


    return (
        <div>
        <h1>Tareas a realizar</h1>
        <form onSubmit={handleSubmit} >
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
            type='text'
            onChange={(e)=>handleInputChange(e)} 
            value={tarea['fecha']}
            placeholder='DD-MM-AAAA'
            name='fecha'/>
        </div>
         <button type='submit' value='Agendar Tarea' name="Enviar">Agendar Tarea</button>
         </form>
         <div>
         {/* {
             tareasEmpresa.length ?
             tareasEmpresa.map(t=>(
                 <p>{t.tarea}</p>
                 
             ))
             : 
             <p>No hay tareas agendadas</p>
         } */}
         </div>
         </div>
    )
}

export default Calendar;