import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { crearLoteDB, getAllLotes } from '../../../redux/actions/loteActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle , faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import swal from "sweetalert";
import Cookies from "universal-cookie";

import { useHistory } from 'react-router';

export default function LoteFormCreate({empresaId}){

    const numLotes = useSelector((state) => state.loteReducer.allLotes);
    const userInfo = useSelector((state) => state.userReducer.userInfo.user.isPremium);
    const history = useHistory()
    const cookies = new Cookies()

    const verifyRender = useSelector(state=>state.loteReducer.verifyRender) // estado global que segun el tipo renderiza todos los lotes o el formLote o el detailLote

        
    if(numLotes.length >= 2 && userInfo === false){
          swal({ 
            title: "para seguir creando mas Lotes pasarse a Premium",
            icon: "error",
            button: true,
          })
        }
    const dispatch = useDispatch()
    const [voltear, setVoletar] = useState(false)
    const [inputs , setInputs] = useState({
        name: null,
        superficie: null,
        ubicacion: null,
        imagen: "",
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
    


    useEffect(()=>{
        dispatch({type:'SET_VERIFY',payload:'formularioCrear'})
    },[])


    const [selectedFile, setSelectedFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    
    const handleFileInputChange = (event) => {
      setSelectedFile(event.target.files[0]);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      // console.log("---handleFileInputChange----", event.target.files[0]);
    };
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
    function handleSubmit(e) {
        e.preventDefault();
         if (selectedFile === null)
           return swal({
             title: "Image Field Cannot Be Empty",
             icon: "warning",
             button: true,
             dangerMode: true,
           });
        const config = {
           headers: {
             "Content-Type": "multipart/form-data",
           },
        };
         const fd = new FormData();
         const extension = selectedFile.name.split(".");
     
         fd.append("name", inputs.name);
         fd.append("superficie", inputs.superficie);
         fd.append("ubicacion", inputs.ubicacion);
         fd.append("empresaId", inputs.empresaId);
    
         fd.append(
           "imagen",
           selectedFile,
           inputs.name + "." + extension[extension.length - 1]
         );
         //fd.get("password", updateinfo.password)
         const infoSendDb = {
            empresaId: empresaId,
           fd,
         };
         dispatch(crearLoteDB(infoSendDb, config));
         setInputs(inputs);
         swal({
           title: "Info Edited",
           icon: "success",
           button: true,
         })
           .then(async () => {
             history.push(`/lote/${empresaId}`);
            await dispatch({type:'SET_VERIFY',payload:'default'})
            await dispatch(getAllLotes(cookies.get('selectedEmpresa').id))
           })
           .catch((e) => console.log(e));
         // alert("¿Seguro desea modificar estos datos?");
         //alert("Datos modificados correctamente, ingrese sesión nuevamente");
       }

    return (
        <motion.div
        initial='hidden'
        animate='visible'
        variants={{
        hidden: {
            scale: 0,
            opacity: -1
        },
        visible: {
            scale: 1,
            opacity: 1,
            transition:.2
        }
        }}>
        <div className={styles.cont}>
            <div className={styles.contCard}>
                    <div className={styles.formCont}>
                        <div className={styles.contenedorCross}>
                            <h1 className={styles.fomularioTitle}>CREACION DE LOTE</h1>
                            <button onClick={cerrar} className={styles.cross}/>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.fomulario}>
                                <div className={styles.fomularioInputs}>
                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Nombre</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='name' value={inputs.name} onBlur={handleInputs} onChange={data=>setInputs({...inputs,name:data.target.value})} className={validate.name=='ERROR'?styles.inputsError:styles.inputs} type="text" placeholder='Nombre del lote...'/>
                                            {validate.name.length ? <div className={validate.name=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.name=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {<p className={validate.name=='ERROR'?styles.alertaError:styles.alertaP}>Nombre de lote incompleto</p>}
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Superficie</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='superficie' value={inputs.superficie} onBlur={handleInputs} onChange={data=>setInputs({...inputs,superficie:data.target.value})} className={validate.superficie=='ERROR'?styles.inputsError:styles.inputs} type="text" placeholder='Superficie del lote...'/>
                                            {validate.superficie.length ? <div className={validate.superficie=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.superficie=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {<p className={validate.superficie=='ERROR'?styles.alertaError:styles.alertaP}>Superficie de lote incompleto</p>}
                                    </div>

                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Ubicación</label>
                                        <div className={styles.contenedorInputs}>
                                            <input name='ubicacion' value={inputs.ubicacion} onBlur={handleInputs} onChange={data=>setInputs({...inputs,ubicacion:data.target.value})} className={validate.ubicacion=='ERROR'?styles.inputsError:styles.inputs} type='text' placeholder='Ubicación del lote...' />
                                            {validate.ubicacion.length ? <div className={validate.ubicacion=='OK'?styles.contIcono:styles.contIconoError}>
                                                <FontAwesomeIcon icon={validate.ubicacion=='OK'?faCheckCircle:faTimesCircle}/>
                                            </div>:null}
                                        </div>
                                        {<p className={validate.ubicacion=='ERROR'?styles.alertaError:styles.alertaP}>Ubicación de lote incompleto</p>}
                                    </div>
                                        
                                    <div className={styles.labelInput}>
                                        <label className={styles.label}>Imagen</label>
                                        <div className={styles.contenedorInputs}>
                                        <input
                                            className={styles.inputCrear}
                                            type="file"
                                            name="imagen"
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileInputChange}
                                            required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <button type="submit" className={styles.btnDetails}>Crear Lote</button>
                        </form>
                    </div>
            </div>
        </div>
    </motion.div>
    )
}
