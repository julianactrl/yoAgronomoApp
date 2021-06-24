import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { crearLoteDB } from '../../../redux/actions/loteActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle , faTimesCircle} from '@fortawesome/free-solid-svg-icons';


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
    //ESTADO para verificar si hay texto o no en los inputs.
    const [validate, setValidate] = useState({ 
        name: '',
        superficie: '',
        ubicacion: '',
        imagen: '',
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
    

    async function crearLote () {
        if(Object.values(inputs).indexOf(null) == -1) {
            if(Object.values(inputs).indexOf('') == -1) {
                console.log('toy en la funcion');
                alert('Lote creado con exito !!')
                await dispatch(crearLoteDB(inputs))
                
                return dispatch({type:'SET_VERIFY',payload:''})
            } 
        }
        console.log('No pudo crearse la empresa');
    }

    useEffect(()=>{
        dispatch({type:'SET_VERIFY',payload:'formularioCrear'})
    },[])

    function handleInputs (data) {
        if(data.target.value.length > 0){
            return setValidate({
                ...validate,
                [data.target.name]:'OK'
            })
        }else{
            setValidate({
                ...validate,
                [data.target.name]:'ERROR'
            })
        }
    }

    return (
        <div className={styles.cont}>
            <div className={styles.contCard}>
                    <div className={styles.formCont}>
                        <div className={styles.contenedorCross}>
                            <h1 className={styles.fomularioTitle}>CREACION DE LOTE</h1>
                            <button onClick={cerrar} className={styles.cross}/>
                        </div>
                        <form  action="" className={styles.fomulario}>
                                <div className={styles.fomularioInputs}>
                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Nombre</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='name' value={inputs.name} onBlur={handleInputs} onChange={data=>setInputs({...inputs,name:data.target.value})} className={styles.inputs} type="text" placeholder='Nombre del lote...'/>
                                            {validate.name.length ? <div className={validate.name=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.name=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {validate.name=='ERROR'&&<p className={styles.alertaP}>Nombre de lote incompleto</p>}
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Superficie</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='superficie' value={inputs.superficie} onBlur={handleInputs} onChange={data=>setInputs({...inputs,superficie:data.target.value})}  className={styles.inputs} type="text" placeholder='Superficie del lote...'/>
                                            {validate.superficie.length ? <div className={validate.superficie=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.superficie=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {validate.superficie=='ERROR'&&<p className={styles.alertaP}>Superficie de lote incompleto</p>}
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Ubicación</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='ubicacion' value={inputs.ubicacion} onBlur={handleInputs} onChange={data=>setInputs({...inputs,ubicacion:data.target.value})} className={styles.inputs} type='text' placeholder='Ubicación del lote...' />
                                            {validate.ubicacion.length ? <div className={validate.ubicacion=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.ubicacion=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {validate.ubicacion=='ERROR'&&<p className={styles.alertaP}>Ubicación de lote incompleto</p>}
                                    </div>
                                        
                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Imagen</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='imagen' value={inputs.imagen} onBlur={handleInputs} onChange={data=>setInputs({...inputs,imagen:data.target.value})} className={styles.inputs} type='text' placeholder='Imagen del lote...' />
                                            {validate.imagen.length ? <div className={validate.imagen=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.imagen=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {validate.imagen=='ERROR'&&<p className={styles.alertaP}>Imagen de lote incompleto</p>}
                                    </div>

                                </div>
                                <button onClick={crearLote} className={styles.btnDetails}>Crear Lote</button>
                        </form>
                    </div>
            </div>
        </div>
    )
}
