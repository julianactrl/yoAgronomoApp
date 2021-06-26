import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTransporte} from '../../redux/actions/transporteActions'
import styles from './styles.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useHistory } from 'react-router';

function UpdateTransporte ({id}) {
    const dispatch = useDispatch();
    const transporte = useSelector(state=>state.transporteReducer.transporteForId);
    const [input, setInput] = useState({
        patente: null,
        conductor: null,
        carga: null,
        fechaEntrada: null,
        fechaSalida: null,
        observaciones: null,
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
    dispatch(getTransporte(id));
    
}, []);



const history = useHistory()
function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/transporte/update/${id}`, input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
    e.target.reset();
    alert('Su transporte fue actualizado!')
    history.push('/transporte/:id')
    console.log('+++++++++++++', input)
        
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
            <label className={styles.labelCrear} htmlFor="">Id: </label>
            <input className={styles.inputCrear}
            type="text" readOnly onChange={(e)=>handleInputChange(e)} value={transporte.id} name="id"/>
        </div>
            
        
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
                type='text'
                onChange={handleInputChange} 
                value={input['fechaEntrada']}
                placeholder={transporte.fechaEntrada}
                name='fechaEntrada'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Fecha de Salida: </label>
                <input className={styles.inputCrear}
                type='text'
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
            </form>
            </div>
            
        </div>
    )
}

export default UpdateTransporte;