import React, { useEffect } from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';
import {useDispatch, useSelector} from 'react-redux'
import { getAllEmpresas } from '../../redux/actions/empresaActions';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'



export default function CardsEmpresas ({empresa}){
    
    function handleCookie () {
        const cookies = new Cookies();
        cookies.set('selectedEmpresa', empresa , {path:'/', expires: new Date(Date.now()+2592000)})
    }

    return (
        <div onClick={handleCookie}>
        <Link to={`/empresa/${empresa.id}`}>
            <div className={styles.main}>
                    <div className={styles.cardCont}>
                        <img src={empresa.imagen} className={styles.img}/>
                        <h1 className={styles.titleEmpresa}>{empresa.name}</h1>
                        <h3 className={styles.titleEmpresa}>{empresa.hectareas}</h3>
                    </div>
            </div>
        </Link>
        </div>

    )  

}