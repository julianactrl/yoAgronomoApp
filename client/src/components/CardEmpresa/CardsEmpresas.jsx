import React from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';



export default function CardsEmpresas (){

    const example = {
        title: 'Example',
        img: image1,
    }

    return (
        <div className={styles.main}>
            <div className={styles.cardCont}>
                <img src={example.img} className={styles.img}/>
                <h1 className={styles.titleEmpresa}>{example.title}</h1>
            </div>
        </div>
    )
}