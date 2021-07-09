import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEmpresa} from '../../redux/actions/empresaActions';
import { getAllTareas,resetTareas } from '../../redux/actions/calendarActions';
import styles from './styles.module.css'
import Header from '../Header/Header';
import {Link} from 'react-router-dom';
import axios from 'axios'
import { useHistory} from 'react-router';
import { motion } from 'framer-motion';

const { REACT_APP_API } = process.env;

function DetailEmpresa ({id}) {

  const history= useHistory();
  
  const idEmpresa = useSelector(state => state.empresaReducer.empresaForId.id)  
    const dispatch = useDispatch();
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    const tareas = useSelector(state=>state.calendarReducer.tareas);

    const [loading, setLoading] = useState(true)
    
    useEffect(()=> {
      dispatch(getEmpresa(id));
      if(idEmpresa){
        dispatch(getAllTareas(idEmpresa))
      }
      
      dispatch(resetTareas())
      if(tareas){
        setLoading(false)
    }
    }, [idEmpresa]);

    function handleAgenda(e){
      e.preventDefault();
      pBaja();
      pMedia();
      pAlta();
    }
  
    function deleteEmpresa(id) {
        axios.delete(`${REACT_APP_API}/empresa/delete/${id}`)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
        alert('Su empresa fue eliminada!')
    }
    const [baja, setBaja] = useState([])
    function pBaja(){
      let baja = tareas.length>0 && tareas.filter((t)=>{
        return t.prioridad.includes('Baja')
      })
      setBaja(baja)
    }
    const [media, setMedia] = useState([])
    function pMedia(){
      let media = tareas.length>0 && tareas.filter((t)=>{
        return t.prioridad.includes('Media')
      })
      setMedia(media)
    }
    const [alta, setAlta] = useState([])
    function pAlta(){
      let alta = tareas.length>0 && tareas.filter((t)=>{
        return t.prioridad.includes('Alta')
      })
      setAlta(alta)
    }
 

    return (
       <motion.div
      initial='hidden'
      animate='visible'
      variants={{
      hidden: {
          scale: .8,
          opacity: -1
      },
      visible: {
          scale: 1,
          opacity: 1,
          transition:{
              delay: .002
          }
      }
      }}
      >
        <div className={styles.cuerpo}>
            <Header />
            
                
            { <div className={styles.div}>
            <li className={styles.liContenedor}>

              <div className={styles.name}>
                        <div className={styles.itemsTop}>
                            <h1 className={styles.nameTitle}>{empresa.name}</h1>
                            <Link to='/home' className={styles.cross}/>
                            <div className={styles.btnsDelEdit}>
                              <Link to={`/update/${empresa.id}`}>
                                <button className={styles.buttonEmpresa}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                              </Link>
                              <Link to={`/home`}>
                                <button onClick={()=>deleteEmpresa(id)} className={styles.eliminarEmpresa}><i class="fa fa-trash-o" aria-hidden="true"></i></button> 
                              </Link>
                            </div>
                        </div>
              </div>

              <div className={styles.caja}>
                  <div className={styles.description}>
                        <h2 className={styles.malditoH2}>Hectáreas totales: {empresa.hectareas}</h2>
                        <h2 className={styles.malditoH2}>Ubicación: {empresa.ubicacion}</h2>
                        <h2 className={styles.agendita}><i class="fa fa-calendar" aria-hidden="true"></i> <button className={styles.agenda} onClick={e=> handleAgenda(e)}>Ver Agenda</button> </h2>
                        <Link to={`/lote/${idEmpresa}`} className={styles.btnLote}>Lotes</Link>
                        <div className={styles.tareas}>
                              <div className={styles.items}>
                              <div className={styles.items}>
                            
                              </div> 
                                
                              <div className={styles.items}>
                              <div className={styles.contTareas}>
                              
                              {
                              loading ? <p>Loading...</p> :
                              alta.length>0 && alta.map(t=>(
                              <Link className={styles.elLink} to ='/tareas'><p className={styles.eachTareaAlta}><i class="fa fa-check" aria-hidden="true"></i>{t.tarea}</p></Link>
                              ))
                              }
                              {
                              loading ? <p>Loading...</p> :
                              media.length>0 && media.map(t=>(
                              <Link className={styles.elLink} to ='/tareas'><p className={styles.eachTareaMedia}><i class="fa fa-check" aria-hidden="true"></i>{t.tarea}</p></Link>
                              ))
                              }
                              {
                              loading ? <p>Loading...</p> :
                              baja.length>0 && baja.map(t=>(
                              <Link className={styles.elLink} to ='/tareas'><p className={styles.eachTareaBaja}><i class="fa fa-check" aria-hidden="true"></i>{t.tarea}</p></Link>
                              ))
                              }
                              </div>
                                            
                              </div>
                              </div>
                        </div>
                  </div>
                  {empresa.imagen ? (
                    <img
                    src={`${REACT_APP_API}/empresa/imagen/${empresa.imagen}`}
                    alt="https://i.stack.imgur.com/y9DpT.jpg"
                    width={500}
                    height={350}
                    className={styles.imgEmpresa}
                  />
                  ) : (
                  <img
                    alt="perfil"
                    src={
                      "https://blog.nutri-tech.com.au/content/images/2021/04/Crop---soybeans.jpg"
                    }
                    className={styles.imgEmpresa}
                  />
                  )}
              </div>
            </li>

            </div> }

            
        
    
        </div>
        </motion.div>
    )
}

export default DetailEmpresa;