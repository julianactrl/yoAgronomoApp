
import React from "react"
import styles from './styles.module.css'
// import icono from '../../../assets/iconClima.png'

export default function LoteCard ({lote}) {
    // const loteExample = {
    //     img: lote[0].imagen,
    //     name: 'Terrada',
    //     hectareas: 1000,
    //     clima: '30º'
    // }

    return (
        <div className={styles.contCard}>
            {/* <img src={icono} alt="" className={styles.icon}/> */}
            <img className={styles.img} src={lote.imagen}/>
            
            <div className={styles.detail}>
                <h1 className={styles.title}>{lote.name}</h1>
                <div className={styles.detailOculto}>
                    <div className={styles.contH2}>
                        <h2 className={styles.clima}>{lote.ubicacion}</h2>
                        <h2 className={styles.hectareas}>{lote.superficie}</h2>
                    </div>
                    <h2 className={styles.text}>Click para ver detalles</h2>
                </div>
            </div>
        </div> 
    )
}