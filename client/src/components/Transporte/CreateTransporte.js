import React, {useState} from "react";
import {postTransporte} from "../../redux/actions/transporteActions";
import styles from './styles.module.css';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert';
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'
const { REACT_APP_API} = process.env



function NewTransporte () {
    const dispatch = useDispatch();
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id);
    console.log(empresaId)
    const [input, setInput] = useState({
        patente: "",
        conductor: "",
        carga: "",
        fechaEntrada: "",
        fechaSalida: "",
        observaciones: "",
        empresaId: empresaId
    });

    function handleInputChange(e){
        setInput({
            
            ...input,
            [e.target.name] : e.target.value
        });
        console.log("Vamo carahoy", input)
    }
    const history = useHistory()
    function handleSubmit(e){
        dispatch(postTransporte(input));
        e.preventDefault();
        swal("El transport fue creado",{icon:"success"})
        history.push("/transporte")
    }

    return (
        <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: -1,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.002,
          },
        },
      }}
    >
        <div className={styles.formCont}>
            <Link to='/transporte' className={styles.cross}></Link>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.box}>
                    <div className={styles.inputs}>
                        <h4 className={styles.labels}>Patente</h4> 
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
                        <h4 className={styles.labels}>Conductor</h4> 
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
                        <h4  className={styles.labels} >Carga</h4> 
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
                        <h4 className={styles.labels}>Fecha De Entrada</h4> 
                        <input
                        placeholder = 'fechaEntrada'  
                        onChange={handleInputChange}
                        id = 'fechaEntrada'
                        type='date'
                        name="fechaEntrada"
                        value= {input.fechaEntrada}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <h4  className={styles.labels} >Fecha De Salida</h4> 
                        <input
                        placeholder = 'fechaSalida'  
                        onChange={handleInputChange}
                        id = 'fechaSalida'
                        type='date'
                        name="fechaSalida"
                        value= {input.fechaSalida}>
                        </input>
                     </div>
                     <div className={styles.inputs}>
                        <h4  className={styles.labels}>Observación</h4> 
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
                     className={styles.btnRegistrar}
                     type='submit'>
                         Registrar transporte
                     </button>
                </div>
            </form>
        </div>
    </motion.div>
        
    )
}

export default NewTransporte;