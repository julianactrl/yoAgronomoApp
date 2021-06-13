import React, { useEffect } from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';
import {useDispatch, useSelector} from 'react-redux'
import { getAllEmpresas } from '../../redux/actions/empresaActions';



export default function CardsEmpresas ({empresa}){
        return (
            <>
            <div className={styles.main}>
                    <div className={styles.cardCont}>
                        <img src={image1} className={styles.img}/>
                        <h1 className={styles.titleEmpresa}>{empresa.name}</h1>
                        <h3 className={styles.titleEmpresa}>{empresa.hectareas}</h3>
                    </div>
            </div>
            </>

        )  

}