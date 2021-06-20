import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'



export default function LoteFormCreate(){
    const dispatch = useDispatch()
    const [voltear, setVoletar] = useState(false)

    function card3d(){
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    function cerrar() {
        dispatch({type:'GET_DETAIL_LOTE',payload:false})
        dispatch({type:'GET_FORM_LOTE',payload:false})
    }

    return (
        <div className={styles.cont}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.formCont}>
                        <div className={styles.contenedorCross}>
                            <button onClick={cerrar} className={styles.cross}/>
                        </div>
                        <div className={styles.form}>
                            <form action="" className={styles.fomulario}>
                                <h1 className={styles.fomularioTitle}>CREACION DE LOTE</h1>
                                <div className={styles.fomularioInputs}>
                                    <p>Nombre</p>
                                    <input className={styles.inputs} type="text" placeholder='Nombre del lote...'/>
                                    <p>Superficie</p>
                                    <input className={styles.inputs} type="text" placeholder='Superficie del lote...'/>
                                    <p>Ubicación</p>
                                    <input className={styles.inputs} type='text' placeholder='Ubicación del lote...' />
                                    <p>Imagen</p>
                                    <input className={styles.inputs} type='text' placeholder='Imagen del lote...' />
                                </div>
                                {/* <button>XXXXXXXXXXX</button> */}
                            </form>
                            {/* <div className={styles.btnCont}> */}
                                {/* <p>Ubicación</p> */}
                                <button onClick={card3d} className={styles.btnDetails}>Crear Lote</button> 
                            {/* </div> */}
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

