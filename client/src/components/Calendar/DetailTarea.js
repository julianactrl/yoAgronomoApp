import React, {useState, useEffect} from 'react';

import { updateTarea, getTarea} from '../../redux/actions/calendarActions';
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Header from '../Header/Header'
import {useHistory} from 'react-router-dom'

import swal from 'sweetalert';
const { REACT_APP_API } = process.env;

function DetailTarea({id}) {

    const dispatch = useDispatch();
    const history = useHistory();

    const idEmpresa = useSelector((state)=> state.empresaReducer.empresaForId.id)
   
    const detailTarea = useSelector((state)=> state.calendarReducer.tareaForId)
    const idTarea = useSelector((state)=> state.calendarReducer.tareaForId.id)

    useEffect(()=> {
        dispatch(getTarea(id));
        
    }, []);

    const [tarea, setTarea] = useState({
        empresaId: idEmpresa,
        id: id,
        tarea:detailTarea.tarea,
        fecha:detailTarea.fecha,
        prioridad: detailTarea.prioridad,
        estado:''
    });
    
  function handleInputChange(e) {
        setTarea({
            ...tarea,                        
             [e.target.name]: e.target.value,  
            });
            
    }
    
    function handleSubmit(e) {
       
        dispatch(updateTarea(tarea))
        // axios.put(`${REACT_APP_API}/tareas/${idTarea}`)
        // .then(response => console.log(response.data)) 
        // .catch(error  => console.log(error))
        swal("Estado de tarea actualizado", { icon: "success" });
        
        history.push(`/home`)
    }
   
        
        
    

    return (
        <div >
        <Header/>
                
    <br></br>    
    <br></br>    
    <br></br>    
    <br></br>  
    <br></br>    
    <br></br>  
    <br></br>    
    <br></br>      
    <form className={styles.estilosForm} onSubmit={handleSubmit} >
    
    <div>
        
        <select name='estado' onChange={(e)=>handleInputChange(e)}>
            <option value=''>SELECCIONA UN ESTADO</option>
            <option value='COMPLETA'>COMPLETA</option>
            <option value='INCOMPLETA'>INCOMPLETA</option>
        </select>
    </div>
    
    
     <button className={styles.buttonTarea} type='submit' value='actualizar estado' name="Enviar" >actualizar estado</button>
    
     </form>
     </div>

    )
}

export default DetailTarea;