import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { crearLoteDB } from '../../../redux/actions/loteActions'



export default function LoteFormCreate({empresaId}){
    const dispatch = useDispatch()
    const [voltear, setVoletar] = useState(false)
    const [inputs , setInputs] = useState({
        name: null,
        superficie: null,
        ubicacion: null,
        imagen: null,
        empresaId: empresaId
    })

    function card3d(){ // funcion para voltear la carta
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    function cerrar() { // funcion para volver al home
        dispatch({type:'SET_VERIFY',payload:''})
    }

    function crearLote () {
        if(Object.values(inputs).indexOf(null) == -1) {
            if(Object.values(inputs).indexOf('') == -1) {
                console.log('toy en la funcion');
                alert('Lote creado con exito !!')
                dispatch(crearLoteDB(inputs))
                return dispatch({type:'SET_VERIFY',payload:''})
            } 
        }
        console.log('No pudo crearse la empresa');
    }

    useEffect(()=>{
        dispatch({type:'SET_VERIFY',payload:'formularioCrear'})
    },[])

    return (
        <div className={styles.cont}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.formCont}>
                        <div className={styles.contenedorCross}>
                            <button onClick={cerrar} className={styles.cross}/>
                        </div>
                        <div className={styles.form}>
                            <form  action="" className={styles.fomulario}>
                                <h1 className={styles.fomularioTitle}>CREACION DE LOTE</h1>
                                <div className={styles.fomularioInputs}>
                                    <p>Nombre</p>
                                    <input value={inputs.name} onChange={data=>setInputs({...inputs,name:data.target.value})} className={styles.inputs} type="text" placeholder='Nombre del lote...'/>

                                    <p>Superficie</p>
                                    <input value={inputs.superficie} onChange={data=>setInputs({...inputs,superficie:data.target.value})}  className={styles.inputs} type="text" placeholder='Superficie del lote...'/>

                                    <div className={styles.alerta}>
                                        <p className={!inputs.name?styles.alertaParrafo:styles.alertaParrafoF}>Nombre Incompleto</p>
                                        <p className={!inputs.superficie?styles.alertaParrafo:styles.alertaParrafoF}>Superficie Incompleta</p>
                                        <p className={!inputs.ubicacion?styles.alertaParrafo:styles.alertaParrafoF}>Ubicación Incompleta</p>
                                        <p className={!inputs.imagen?styles.alertaParrafo:styles.alertaParrafoF}>Imagen Incompleta</p>
                                    </div>

                                    <p>Ubicación</p>
                                    <input value={inputs.ubicacion} onChange={data=>setInputs({...inputs,ubicacion:data.target.value})} className={styles.inputs} type='text' placeholder='Ubicación del lote...' />

                                    <p>Imagen</p>
                                    <input value={inputs.imagen} onChange={data=>setInputs({...inputs,imagen:data.target.value})} className={styles.inputs} type='text' placeholder='Imagen del lote...' />

                                </div>
                                {/* <button>XXXXXXXXXXX</button> */}
                            </form>
                            {/* <div className={styles.btnCont}> */}
                                {/* <p>Ubicación</p> */}
                                <button onClick={crearLote} className={styles.btnDetails}>Crear Lote</button>
                                {/* <p>Q ondaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>  */}
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

