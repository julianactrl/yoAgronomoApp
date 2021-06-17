import React, { useState } from 'react'
// import Header from '../../Header/Header'
import styles from './styles.module.css'
// import image1 from '../../../assets/image1.png'

// yoAgronomoApp\client\src\assets\image1.jpg

export default function LoteDetails({lote}){

    const [voltear, setVoletar] = useState(false)

    const loteExample = {
        img: '',
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
    console.log('estoy en detaillllllllllllllllll',lote);
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
                    <button onClick={card3d} className={styles.btnAtras}>Atrás</button>
                        <h1 className={styles.titleLote}>CARGA DE DATOS</h1>
                        <form action="" className={styles.form}>
                            <div className={styles.choseenCont}>
                                <button className={styles.btn}>Obsevación</button>
                                <button className={styles.btn}>Recomendación</button>
                            </div>
                            <div className={styles.contCargaText}>
                                <div className={styles.contTextarea}>
                                    <h2 class={styles.textareatitle}>Agregar...</h2>
                                    <textarea name="message" rows="10" cols="60" className={styles.textatera}></textarea>
                                </div> 
                                <div className={styles.cargarImg}>
                                    <p>Subir Imágen</p>
                                    <div class={styles.fileselect} id="src-file1" >
                                        <input type="file" name="src-file1" aria-label="Archivo"/>
                                    </div>
                                </div>
                            </div>
                            <input type='submit' className={styles.submit}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}