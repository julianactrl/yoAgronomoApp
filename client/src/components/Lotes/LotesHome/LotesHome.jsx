import React, { useState } from 'react'
import Header from '../../Header/Header'
import styles from './styles.module.css'
import imgExample from '../../../assets/image1.jpg';
import LoteDetail from '../LoteDetails/LoteDetail'
import icono from '../../../assets/iconClima.png'




export default function LotesHome(){


    const loteExample = {
        img: imgExample,
        name: 'Terrada',
        hectareas: 1000,
        clima: '30º'
    }
    return(
        <div className={styles.contMain}>
            <Header/>
            <LoteDetail/>
            {/* <div className={styles.contCard}>
                <img src={icono} alt="" className={styles.icon}/>
                <img className={styles.img} src={'https://live.staticflickr.com/3793/13366950695_cbb23da4ca_b.jpg'}/>
                
                <div className={styles.detail}>
                    <h1 className={styles.title}>{loteExample.name}</h1>
                    <div className={styles.detailOculto}>
                        <h2 className={styles.clima}>{loteExample.clima}</h2>
                        <h2 className={styles.hectareas}>{loteExample.hectareas}</h2>
                        <h2 className={styles.text}>Click para ver detalles</h2>
                    </div>
                </div>
            </div> */}
        </div>
    )
}