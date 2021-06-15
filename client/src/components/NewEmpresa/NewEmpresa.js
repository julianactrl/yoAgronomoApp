import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css'
import axios from 'axios';
import {postEmpresa} from '../../redux/actions/empresaActions';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import { useHistory } from 'react-router';

function NewEmpresa () {
const [input, setInput] = useState({
        name: '',
        hectareas: '',
        ubicacion: '',
        imagen: ''
})
function handleInputChange(e) {
    setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
}
const history = useHistory()
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
    console.log(input.imagen)
    dispatch(postEmpresa(input));
    e.target.reset();
    alert('Su empresa fue creada!')
    history.push('/home')
        
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
            <Header />
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
                placeholder='Estancia YoAgronomo'
                name='name'/>
            </div>
            <div>
                <label>Hectáreas totales: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['hectareas']}
                placeholder='600'
                name='hectareas'/>
            </div>
            <div>
                <label>Ubicación: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['ubicacion']}
                placeholder='Santa Fe'
                name='ubicacion'/>
            </div>
           
            <div>
                <label>Imagen: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['imagen']}
                placeholder='Insert URL'
                name='imagen'/>
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