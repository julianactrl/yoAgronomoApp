import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEmpresa} from '../../redux/actions/empresaActions';
import styles from './styles.module.css'

import data from './data.json'


function DetailEmpresa (props) {

let empresa = useSelector((state)=>state.empresaForId);
const dispatch = useDispatch();

useEffect(()=> {
        
    const id = props.match.params.id;
    dispatch(getEmpresa(id));
      
}, []);




// const [empresas, setEmpresas] = useState(data.empresas)

    return (
        <div className={styles.background}>
            {
            
                
                    <div>
                    <li key={empresa.id}>
                    <h1 className={styles.name}>{empresa.name}</h1>
                    <div className={styles.caja}>
                    <div className={styles.description}>
                    <h3>Hectáreas totales: {empresa.hectareas}</h3>
                    <h3>Ubicación: {empresa.ubicación}</h3>
                    <h2>Tareas a realizar:</h2>
                    <h3>{empresa.tarea1}</h3>
                    <h3>{empresa.tarea2}</h3>
                    <h3>{empresa.tarea3}</h3>
                    </div>
                    </div>
                    </li>
                    </div>
                
            }

        </div>
    )
}

export default DetailEmpresa;