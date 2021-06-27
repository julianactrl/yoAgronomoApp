import React, {useState} from "react";
import {postTransporte} from "../../redux/actions/transporteActions";
import styles from './styles.module.css';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'


function NewTransporte () {
    const dispatch = useDispatch();
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id);
    const [input, setInput] = useState({
        patente: "",
        conductor: null,
        carga: null,
        fechaEntrada: null,
        fechaSalida: null,
        observaciones: null,
        empresaId: empresaId
    });

    function handleInputChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
    }

    

    const history = useHistory()
    function handleSubmit(e){
        console.log(input);
        e.preventDefault();
        dispatch(postTransporte(input));
        history.push('/empresa')}

    function deleteTransporte(transporteId) {
        
            axios.delete(`http://localhost:3001/transporte/delete/${transporteId}`)
            .then(response => console.log(response.data)) 
            .catch(error  => console.log(error))
            alert('Su transporte fue eliminado!')  
    }

    return (
        <di>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.box}>

                    <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'patente'  
                        onChange={handleInputChange}
                        id = 'patente'
                        type='text'
                        name="patente"
                        value= {input.patente}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'conductor'  
                        onChange={handleInputChange}
                        id = 'conductor'
                        type='text'
                        name="conductor"
                        value= {input.conductor}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'carga'  
                        onChange={handleInputChange}
                        id = 'carga'
                        type='text'
                        name="carga"
                        value= {input.carga}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'fechaEntrada'  
                        onChange={handleInputChange}
                        id = 'fechaEntrada'
                        type='text'
                        name="fechaEntrada"
                        value= {input.fechaEntrada}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'fechaSalida'  
                        onChange={handleInputChange}
                        id = 'fechaSalida'
                        type='text'
                        name="fechaSalida"
                        value= {input.fechaSalida}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <label  className={styles.labels} ></label> 
                        <input
                        placeholder = 'observaciones'  
                        onChange={handleInputChange}
                        id = 'observaciones'
                        type='text'
                        name="observaciones"
                        value= {input.observaciones}>
                        </input>
                     </div>
                     <button
                     type='submit'>
                         Registrar transporte
                     </button>
                </div>
            </form>
        </di>
    )
}

export default NewTransporte;