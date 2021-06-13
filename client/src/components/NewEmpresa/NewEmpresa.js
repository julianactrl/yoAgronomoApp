import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css'
import axios from 'axios';
import {postEmpresa} from '../../redux/actions/empresaActions';
import { motion } from 'framer-motion';

function NewEmpresa () {
const [input, setInput] = useState({
        name: '',
        hectareas: '',
        ubicacion: '',
        image: ''
})
function handleInputChange(e) {
    setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
}
function handleSubmit(e) {
    e.preventDefault();
    if(!input.name) {
        alert('Debe ingresar un nombre!')
        return
    }
    if(!input.ubicacion) {
        alert('Debe ingresar una ubicación!')
        return
    }
    dispatch(postEmpresa(input));
    e.target.reset();
    alert('Su empresa fue creada!')
        
}
const dispatch = useDispatch();
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
        <div className={styles.div}>
        <h2 className={styles.alineado} >Nueva Empresa</h2>
        <div className={styles.caja}>
        <form className={styles.estilosForm} 
        onSubmit={handleSubmit} 
        > 
            <div>
                <label>Nombre: </label>
                <input 
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['name']}
                placeholder='Nombre...'
                name='name'/>
            </div>
            <div>
                <label>Hectáreas totales: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['hectareas']}
                placeholder='Hectáreas totales...'
                name='hectareas'/>
            </div>
            <div>
                <label>Ubicación: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['ubicacion']}
                placeholder='Ubicación'
                name='ubicacion'/>
            </div>
           
            <div>
                <label>Imagen: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['image']}
                paceholder='insert URL'
                name='image'/>
            </div>
                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Crear Empresa</button>
            </form>
            </div>
        </div>
        </motion.div>
    )
}

export default NewEmpresa;