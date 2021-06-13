import React from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';
import {useSelector} from 'react-redux'
import { getAllEmpresas } from '../../redux/actions/empresaActions';



export default function CardsEmpresas (){
    const empresas = useSelector(state=> state.empresas)
        const example = {
            title: 'Example',
            img: image1,
            hectareas: 200
        }

    return (
        <div className={styles.main}>
            <div className={styles.cardCont}>
                <img src={example.img} className={styles.img}/>
                <h1 className={styles.titleEmpresa}>{example.title}</h1>
                <h3 className={styles.titleEmpresa}>{example.hectareas}</h3>
            </div>
        </div>
    )
}