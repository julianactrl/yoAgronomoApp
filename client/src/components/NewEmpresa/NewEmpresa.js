import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css'
import axios from 'axios';
import {postEmpresa} from '../../redux/actions/empresaActions';

function NewEmpresa () {

const [input, setInput] = useState({
        name: '',
        hectáreas: '',
        ubicación: '',
        image: ''
})

function handleSubmit(e) {
    e.preventDefault();
    
    axios.post('http://localhost:3001/createEmpresa', input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
        
}

function handleInputChange(e) {
    setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
}

const dispatch = useDispatch();

useEffect(()=>{
     dispatch(postEmpresa(input));
 }, [])


    return (
        
        <div >
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
                value={input['hectáreas']}
                placeholder='Hectáreas totales...'
                name='hectáreas'/>
            </div>
            <div>
                <label>Ubicación: </label>
                <input
                type='text'
                onChange={handleInputChange} 
                value={input['ubicación']}
                placeholder='Ubicación'
                name='ubicación'/>
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
            <button className={styles.alineado} type='submit' value='Crear empresa' name="Enviar">Crear Empresa</button>
            </form>
            </div>
        </div>
    )
}

export default NewEmpresa;