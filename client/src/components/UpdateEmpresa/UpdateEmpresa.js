import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa, updateEmpresa} from '../../redux/actions/empresaActions';
import styles from './styles.module.css';
import axios from 'axios';
import Weather from '../Weather/Weather'
import Header from '../Header/Header';
import { useHistory } from 'react-router';

function UpdateEmpresa ({id}) {
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);

    const [input, setInput] = useState({
        name: '',
        hectareas: '',
        ubicacion: '',
        imagen: ''
})

async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        console.log('-------', input)
    }

const dispatch = useDispatch();

useEffect(()=> {
    dispatch(getEmpresa(id));
    
}, []);



const history = useHistory()
function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/empresa/${id}`, input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
    e.target.reset();
    alert('Su empresa fue actualizada!')
    history.push('/home')
    console.log('+++++++++++++', input)
        
}


    return (
        <div className={styles.div}>
            <Header />
         <h2 className={styles.alineado} >Actualizar Empresa</h2>
        <div className={styles.caja}>
        <form className={styles.estilosForm} 
        onSubmit={handleSubmit} 
        > 
        <div>
            <label className={styles.labelCrear} htmlFor="">Id: </label>
            <input className={styles.inputCrear}
            type="text" readOnly onChange={(e)=>handleInputChange(e)} value={empresa.id} name="id"/>
        </div>
            
        
            <div>
                <label className={styles.labelCrear}>Nombre: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['name']}
                placeholder={empresa.name}
                name='name' 
                />
            </div>
            <div>
                <label className={styles.labelCrear}>Hectáreas totales: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['hectareas']}
                placeholder={empresa.hectareas}
                name='hectareas'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Ubicación: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['ubicacion']}
                placeholder={empresa.ubicacion}
                name='ubicacion'/>
            </div>
           
            <div>
                <label className={styles.labelCrear}>Imagen: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={handleInputChange} 
                value={input['imagen']}
                placeholder={empresa.imagen}
                name='imagen'/>
            </div>
                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Actualizar Empresa</button>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateEmpresa