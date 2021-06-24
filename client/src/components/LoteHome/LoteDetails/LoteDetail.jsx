  
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import logoDelete from '../../../assets/trash.png'
import logoEdit from '../../../assets/edit.png'
import { getWeather } from '../../../redux/actions/weatherActions';
import { borrarLote, getManejo, crearLoteManejo, deleteManejo, updateLot, updateManejoLot } from '../../../redux/actions/loteActions';


export default function LoteDetails({lote}){

    const [voltear, setVoletar] = useState(false);
    const [botonera, setBotonera] = useState(false);
    const [auxState, setAuxState] = useState(false);
    const [edit, setEdit] = useState(lote.name);
    const [formulario, setFormulario] = useState(false);
    const [post, setPost] = useState('');

    const weather = useSelector(state => state.weatherReducer.weather)
    const manejoLote = useSelector(state => state.loteReducer.manejoLote)
    
    const [editManejo, setEditManejo] = useState({
        observaciones: null,
        recomendaciones: null,
    });
    const [editManejoAux, setEditManejoAux] = useState(false)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeather(lote.ubicacion))
    },[]) 
    const ovflow = useRef()

    function btnObsTar(){
        if(botonera){
            setBotonera(false)
        }else{
            setBotonera(true)
        }
    }
    const observacionData = useRef(null);
    const recomendacionData = useRef(null);
    const imageData = useRef(null);

    ///////////////////////////ARROWS SLIDER//////////////////////////////////////////////////
    function SampleNextArrow(props) {
        const { style, onClick } = props;
        return (
          <div
            className={styles.nextBtn}
            style={style}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { style, onClick } = props;
        return (
          <div
          className={styles.prevBtn}
            style={style}
            onClick={onClick}
          />
        );
      }
      const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 100,
        classname: 'slides',
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
      };
    /////////////////////////////////////////////////////////////////////////////////////// 
    async function postearManejo(){
        const data = {
            observaciones: observacionData.current.value + "",
            recomendaciones: recomendacionData.current.value + "",
            image: imageData.current.value + "",
        }
        console.log('CREANDO');
        await crearLoteManejo(data, lote.id) 
        console.log('CREADO');
        await dispatch(getManejo(lote.id))
        if(voltear){
            setVoletar(false)  
          }else{
              setVoletar(true)  
          }
    }


    function deleteLote(){
        borrarLote(lote.id);
        dispatch({type:'SET_VERIFY',payload:''})
        
    }
    function handleEdit(){
        const updated = lote
        updated.name = edit
        updateLot(updated, lote.id)
        setAuxState(false)
    }
    async function handleEditManejo(id){
        const updated = manejoLote.find(m=> m.id == id);
        console.log('OBEJO MANEJO AAAAAAAAA',updated)

        updated.observaciones = editManejo.observaciones
        updated.recomendaciones = editManejo.recomendaciones
        console.log('ASADAS EDI MANEJOSA Sas da ', editManejo);
        await updateManejoLot(updated, id)
        setEditManejoAux(false)
        dispatch(getManejo(lote.id))
    }
 
    function card3d(){
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    async function borrarManejo(id){
        await deleteManejo(id);
        await dispatch(getManejo(lote.id))
        alert('Observación eliminada');
    }
    function cerrar(){
        // dispatch({type:'GET_DETAIL_LOTE',payload:false})
        dispatch({type:'SET_VERIFY',payload:''})
    }
    return(
        <div className={styles.contMain}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.loteDetails}>
                        <div className={styles.slider}>
                            <div className={styles.contenedorHeader}>
                                <input onChange={(e)=>{e.target.value.length<=15&&setEdit(e.target.value)}} className={auxState?styles.inputName:styles.none} type="text" value={edit}/>
                                <button className={auxState?styles.inputNameBtn:styles.none} type='submit' onClick={handleEdit}>Editar</button>
                                <h1 className={!auxState?styles.name:styles.none}>{edit}</h1> 
                                <div className={styles.contLogoDelEdit}>
                                    <img onClick={deleteLote} src={logoDelete} alt="" className={styles.deleteLogo}/>
                                    <img onClick={()=>{setAuxState(true)}}src={logoEdit} alt="" className={styles.editLogo} />
                                </div> 
                            </div>
                            <Slider {...settings} >
                                <img src={lote.imagen} className={styles.img}/>
                                <img src={'https://www.semana.com/resizer/IEcOf8TJx4XxRszD1F26YO7lixw=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/4KEOUCGM7FDRHGJVNJJWTAF464.jpeg'} className={styles.img}/>
                            </Slider>
                        </div>
                        
                        <div className={styles.details}>
                        <button onClick={cerrar} className={styles.cross}/>                           

                            <div className={botonera?styles.ghostDivHidden:styles.ghostDiv}>
                                <div className={styles.clima}>
                                    {
                                        weather[0]?
                                            (
                                                <div className={styles.contClima}>
                                                    <img src={weather[0].current.condition.icon} className={styles.imgClima}alt="" />
                                                    <div className={styles.contClimaText}>
                                                        <p className={styles.dataText}>Ubicación: <span>{lote.ubicacion}</span></p>
                                                        <p className={styles.dataText}>Superficie: <span>{lote.superficie}</span></p> 
                                                    </div>
                                                    
                                                </div>
                                            )
                                        :null
                                    }
                            </div>
                                {
                                    weather[0]?
                                        (
                                            <div className={styles.contDataClima}>
                                                <p className={styles.dataText}>Temperatura: <span>{weather[0].current.temp_c}</span>°</p>
                                                <p className={styles.dataText}>Velocidad del viento: <span>{weather[0].current.wind_kph}</span>km/h</p>
                                                <p className={styles.dataText}>Humedad: <span>{weather[0].current.humidity}</span>%</p>                          
                                            </div>
                                        )
                                    :null
                                }                             
                            </div>
                            <div className={styles.obsRec}>
                                <div className={botonera?styles.contObsActivated:styles.contObsDesactivated}>
                                    <h1 onClick={()=>{btnObsTar(true)}}className={botonera?styles.none:null}>MANEJO</h1>
                                    <div onClick={()=>{btnObsTar(true)}}className={botonera?styles.contTitleManejo:styles.none}>
                                        <h4 className={styles.manejoTitle}>Observaciones</h4>
                                        <h4 className={styles.manejoTitle}>Recomendaciones</h4>
                                    </div>
                                    <div ref={ovflow} className={botonera?styles.contOverflow:styles.none}>
                                            <div className={styles.cardManejo}>
                                                <div className={styles.obsData}>
                                                        {
                                                            manejoLote.map((data) =>{
                                                                const {id} = data
                                                                return(
                                                                    <div className={styles.segmentManejo}>
                                                                        <div className={styles.contEditDelManejo}>
                                                                            <img onClick={()=>{borrarManejo(id)}} src={logoDelete} alt="" className={styles.deleteLogoManejo}/>
                                                                            <img onClick={()=>{setEditManejoAux(true)}}src={logoEdit} alt="" className={styles.editLogoManejo} />
                                                                        </div> 
                                                                        <div className={styles.dataManejo}>
                                                                            <div className={styles.obs}>
                                                                                <p className={editManejoAux?styles.none:null}>{data.observaciones}</p>
                                                                                <textarea type="text" className={editManejoAux?styles.editManejo:styles.none} onChange={(e)=>{setEditManejo({...editManejo, observaciones: e.target.value})}}/>
                                                                            </div>
                                                                            <button type='submit' onClick={()=>{handleEditManejo(id)}} className={editManejoAux?styles.editManejoBtn:styles.none}>EDITAR</button>
                                                                           <div className={styles.rec}>
                                                                              <p className={editManejoAux?styles.none:null}>{data.recomendaciones}</p>
                                                                              <textarea type="text" className={editManejoAux?styles.editManejo:styles.none} onChange={(e)=>{setEditManejo({...editManejo,recomendaciones: e.target.value})}}/> 
                                                                           </div>
                                                                           
                                                                        </div> 
                                                                    </div>
                                                                    
                                                                )
                                                            })
                                                        } 
                                                </div>                                             
                                            </div>
                                    
                                        </div>
                                    </div>
                            </div>
                            <button onClick={card3d} className={styles.btnDetails}>Añadir Observación</button>
                        </div>

                    </div>
                    <div className={styles.loteForm}>
                    <button onClick={card3d} className={styles.btnAtras}>Atrás</button>
                        <h1 className={styles.titleLote}>CARGA DE DATOS</h1>
                        <div className={styles.form}>                            
                            <div className={!formulario?styles.contCargaText:styles.none}>
                                <div className={styles.contTextarea}>
                                    <h2 class={styles.textareatitle}>Indicá tu observación acá abajo</h2>
                                    <textarea ref={observacionData} name="message" rows="20" cols="100" className={styles.textatera}></textarea>
                                </div> 
                                <div className={styles.cargarImg}>
                                    <p>Adjuntar Imágen</p>
                                    <div class={styles.fileselect} id="archivo" >
                                        <input ref={imageData}type="file" name="archivo" aria-label="Archivo"/>
                                    </div>
                                </div>
                            </div>
                            <div className={formulario?styles.contCargaText:styles.none}>
                                <div className={styles.contTextarea}>
                                    <h2 class={styles.textareatitle}>Ahora añadí tu recomendación...</h2>
                                    <textarea ref={recomendacionData} name="message" rows="20" cols="100" className={styles.textatera}></textarea>
                                </div>
                                <div className={styles.contSubmit}>
                                    <button onClick={postearManejo} className={styles.submit}>Enviar</button>
                                </div> 
                            </div>                           
                            <button className={!formulario?styles.btnsPrevNext:styles.none} onClick={()=>{setFormulario(true)}}>Siguiente</button>
                            <button className={formulario?styles.btnsPrevNext:styles.none} onClick={()=>{setFormulario(false)}}>Atrás</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}