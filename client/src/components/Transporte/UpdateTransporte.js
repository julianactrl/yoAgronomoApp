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
const {REACT_APP_API} = process.env


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

    history.push("/transporte")
}

const history = useHistory()
function handleSubmit(e) {
    e.preventDefault();
   axios.put(`${REACT_APP_API}/transporte/update/${id}`, input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
    e.target.reset();
    swal("Transporte Actualizado",{icon:"success"})
    history.push(`/transporte`)
}



    return (
        <div className={styles.divtotal}>
            <Header />
        <div className={styles.formCont}>
        <Link to='/transporte' className={styles.cross}></Link>
        <form className={styles.form} 
        onSubmit={handleSubmit} 
        > 
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Patente </h4>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['patente']}
                placeholder={transporte.patente}
                name='patente' 
                />
            </div>
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Conductor </h4>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['conductor']}
                placeholder={transporte.conductor}
                name='conductor'/>
            </div>
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Carga</h4>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['carga']}
                placeholder={transporte.carga}
                name='carga'/>
            </div>
           
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Fecha de Entrada </h4>
                <input className={styles.inputCrear}
                type='date'
                onChange={handleInputChange} 
                value={input['fechaEntrada']}
                placeholder={transporte.fechaEntrada}
                name='fechaEntrada'/>
            </div>
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Fecha de Salida</h4>
                <input className={styles.inputCrear}
                type='date'
                onChange={handleInputChange} 
                value={input['fechaSalida']}
                placeholder={transporte.fechaSalida}
                name='fechaSalida'/>
            </div >
            <div className={styles.inputs}>
                <h4 className={styles.labelCrear}>Observaciones: </h4>
                <input className={styles.inputCrear}
                type='text'
                onChange={handleInputChange} 
                value={input['observaciones']}
                placeholder={transporte.observaciones}
                name='observaciones'/>
            </div>
                <br></br>
                <div className={styles.contActDel}>
                    <button className={styles.btnActualizar} type='submit' value='Crear empresa' name="Enviar">Actualizar </button>
                    <Link to={"/transporte"} className={styles.delete}>
                        <h3 onClick={()=> deleteTransporte(id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                        </h3>
                    </Link>
                </div>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateTransporte;