import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTransporte,getTransporteById,deleteTransporte} from '../../redux/actions/transporteActions'
import styles from './styles.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from 'sweetalert';
const { REACT_APP_API, REACT_APP_API_HEROKU} = process.env


function UpdateTransporte ({id}) {
    const dispatch = useDispatch();
    const transporte = useSelector(state=>state.transporteReducer.transporte);
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id)
    const [input, setInput] = useState({
        patente: transporte.patente,
        conductor: transporte.conductor,
        carga: transporte.carga,
        fechaEntrada: transporte.fechaEntrada,
        fechaSalida: transporte.fechaSalida,
        observaciones: transporte.observaciones,
    });

async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        console.log('-------', input)
}


useEffect(()=> {
    dispatch(getTransporteById(id));  
}, []);

function deleteTransporte(id) {
    axios.delete(`${REACT_APP_API}/transporte/delete/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        })
        swal("El transport fue eliminado",{icon:"success"})
}

const history = useHistory()
function handleSubmit(e) {
    e.preventDefault();
   axios.put(`http://localhost:3001/transporte/update/${id}`, input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
    e.target.reset();
    swal("Transporte Actualizado",{icon:"success"})
    history.push(`/empresa/${empresaId}`)

}



    return (
        <div className={styles.div}>
            <Header />
         <h2 className={styles.alineado} >Actualizar Transporte</h2>
        <div className={styles.caja}>
        <form className={styles.estilosForm} 
        onSubmit={handleSubmit} 
        > 
            <div>
                <label className={styles.labelCrear}>Patente: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['patente']}
                placeholder={transporte.patente}
                name='patente' 
                />
            </div>
            <div>
                <label className={styles.labelCrear}>Conductor: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['conductor']}
                placeholder={transporte.conductor}
                name='conductor'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Carga: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['carga']}
                placeholder={transporte.carga}
                name='carga'/>
            </div>
           
            <div>
                <label className={styles.labelCrear}>Fecha de Entrada: </label>
                <input className={styles.inputCrear}
                type='date'
                onChange={handleInputChange} 
                value={input['fechaEntrada']}
                placeholder={transporte.fechaEntrada}
                name='fechaEntrada'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Fecha de Salida: </label>
                <input className={styles.inputCrear}
                type='date'
                onChange={handleInputChange} 
                value={input['fechaSalida']}
                placeholder={transporte.fechaSalida}
                name='fechaSalida'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Observaciones: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={handleInputChange} 
                value={input['observaciones']}
                placeholder={transporte.observaciones}
                name='observaciones'/>
            </div>
                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Actualizar transporte</button>
            
            <Link to={"/transporte"}>
                <h3 onClick={()=> deleteTransporte(id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
                </h3>
            </Link>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateTransporte;