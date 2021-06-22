  
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import logoDelete from '../../../assets/trash.png'
import logoEdit from '../../../assets/edit.png'
import { getWeather } from '../../../redux/actions/weatherActions';
import { borrarLote, getManejo, crearLoteManejo, deleteManejo } from '../../../redux/actions/loteActions';


export default function LoteDetails({lote}){

    const [voltear, setVoletar] = useState(false);
    const [botonera, setBotonera] = useState(false)
    const [formulario, setFormulario] = useState(false);
    const [post, setPost] = useState('');
    const [cargarDatos, setCargarDatos] = useState({
        observaciones: null,
        recomendaciones: null,
        image: null,
    })

    const weather = useSelector(state => state.weatherReducer.weather)
    const manejoLote = useSelector(state => state.loteReducer.manejoLote)
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeather(lote.ubicacion))
    },[]) 
    useEffect(()=>{

    },[manejoLote])

    useEffect(async () => {
        if(cargarDatos.observaciones !== null){
           await crearLoteManejo(cargarDatos, lote.id)
        }
        setPost(Math.random())
        
    },[cargarDatos])

    useEffect(() => {
         setPost('') 
    },[post])
    useEffect(async () => {
        await dispatch(getManejo(lote.id))  
    },[post])

    // // Función renderizadora de Manejos ...
    // function renderManejo(manejo, verify){
    //     if(verify){
    //     return(
    //         <>
    //                 {
    //                 mane.map(data=>{
    //                         return(
    //                             <div className={styles.segmentManejo}>
    //                                 <div className={styles.deleteManejobtnHidden}></div>
    //                                 <div className={styles.dataManejo}>
    //                                         <p>{data.recomendaciones}</p> 
    //                                 </div>  
    //                             </div>
    //                         )
    //                     })
    //                 }
    //             </>
    //         )   
    //     }

    // }
    //Funcion para la botonera de Manejo...

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

    function postearManejo(){
        setCargarDatos({
            observaciones: observacionData.current.value + "",
            recomendaciones: recomendacionData.current.value + "",
            image: imageData.current.value + "",
        })
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
    function card3d(){
        if(voltear){
          setVoletar(false)  
        }else{
            setVoletar(true)  
        }
        
    }
    async function borrarManejo(id){
        await deleteManejo(id);
        setPost(Math.random());
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
                                <h1 className={styles.name}>{lote.name}</h1>
                                <div className={styles.contLogoDelEdit}>
                                    <img onClick={deleteLote} src={logoDelete} alt="" className={styles.deleteLogo}/>
                                    <img src={logoEdit} alt="" className={styles.editLogo} />
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
                                <div onClick={()=>{btnObsTar(true)}} className={botonera?styles.contObsActivated:styles.contObsDesactivated}>
                                    <h1 className={botonera?styles.none:null}>MANEJO</h1>
                                    <div className={botonera?styles.contTitleManejo:styles.none}>
                                        <h4 className={styles.manejoTitle}>Observaciones</h4>
                                        <h4 className={styles.manejoTitle}>Recomendaciones</h4>
                                    </div>
                                    <div className={botonera?styles.contOverflow:styles.none}>
                                        <div className={styles.contOverflowText}>
                                            <div className={styles.obs}>
                                                <div className={styles.obsData}>
                                                        {
                                                            post?manejoLote.map((data) =>{
                                                                const {id} = data
                                                                return(
                                                                    <div className={styles.segmentManejo}>
                                                                        <button className={styles.deleteManejobtn} onClick={()=>{borrarManejo(id)}}>x</button>
                                                                        <div className={styles.dataManejo}>
                                                                           <p>{data.observaciones}</p> 
                                                                           <img src={data.image} alt="" />
                                                                        </div> 
                                                                    </div>
                                                                    
                                                                )
                                                            }):null
                                                        } 
                                                </div>                                             
                                            </div>  
                                            <div className={styles.recom}>
                                                <div className={styles.recData}>
                                                    {
                                                    post?manejoLote.map(data=>{
                                                            return(
                                                                <div className={styles.segmentManejo}>
                                                                    <div className={styles.deleteManejobtnHidden}></div>
                                                                    <div className={styles.dataManejo}>
                                                                           <p>{data.recomendaciones}</p> 
                                                                    </div>  
                                                                </div>
                                                            )
                                                        }):null
                                                    }
                                                </div>
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