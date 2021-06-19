import React, { useState } from 'react'
import styles from './styles.module.css'



export default function LoteFormCreate(){

    const [voltear, setVoletar] = useState(false)

    function card3d(){
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    return (
        <div className={styles.cont}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.formCont}>
                        <div className={styles.form}>
                            <form action="" className={styles.fomulario}>
                                <h1 className={styles.fomularioTitle}>CARGA DE LOTES</h1>
                                <div className={styles.fomularioInputs}>
                                    <p>Nombre</p>
                                    <input type="text" placeholder='Nombre del lote...'/>
                                    <p>Superficie</p>
                                    <input type="text" placeholder='Superficie del lote...'/>
                                </div>
                            </form>
                            <div className={styles.btnCont}>
                                <p>Ubicación</p>
                                <button onClick={card3d} className={styles.btnDetails}>Selecionar en el Mapa</button> 
                            </div>
                        </div>

                    </div>
                    <div className={styles.card2} >
                        {/* <h1>AAAAAAAA</h1> */}
                        <button onClick={card3d} className={styles.btnDetails}>Selecionar en el Mapa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// name: {
//     type: DataTypes.STRING,
//     allowNull: true,
// },
// superficie: {
//     type: DataTypes.STRING,
// },
// ubicacion: {
//     type: DataTypes.STRING,
// },
// imagen: {
//     type: DataTypes.STRING,
// }