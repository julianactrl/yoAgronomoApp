import React, { useState } from 'react'
import Header from '../../Header/Header'
import styles from './styles.module.css'
import imgExample from '../../../assets/image1.jpg'



export default function LoteDetails(){

    const [voltear, setVoletar] = useState(false)

    const loteExample = {
        img: imgExample,
        name: 'Terrada',
        hectareas: 1000

    }
    function card3d(){
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    return(
        <div className={styles.contMain}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.loteDetails}>
                        <img src={'https://www.semana.com/resizer/IEcOf8TJx4XxRszD1F26YO7lixw=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/4KEOUCGM7FDRHGJVNJJWTAF464.jpeg'} className={styles.img}/>
                        <div className={styles.details}>
                            <h1 className={styles.name}>{loteExample.name}</h1>
                            <h1 className={styles.text}>MANEJO</h1>
                            <div className={styles.obsRec}>
                                <div className={styles.contAux}>
                                    <h3>OBSERVACIONES:</h3>
                                    <p>E</p> 
                                </div>
                                <div className={styles.contAux}>
                                    <h3>RECOMENDACIONES:</h3>
                                    <p>A</p>   
                                </div>
                                
                            </div>
                            <button onClick={card3d} className={styles.btnDetails}>Añadir Observación</button>
                        </div>

                    </div>
                    <div className={styles.loteForm}>
                        <button onClick={card3d} className={styles.btn}>Atrás</button>
                    </div>
                </div>
               
            </div>
        </div>
    )
}