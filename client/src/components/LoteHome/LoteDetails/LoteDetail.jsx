import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import logoDelete from '../../../assets/trash.png'
import logoEdit from '../../../assets/edit.png'
import { getWeather } from '../../../redux/actions/weatherActions';

export default function LoteDetails({lote}){

    const [voltear, setVoletar] = useState(false);
    const [botonera, setBotonera] = useState('')
    const [formulario, setFormulario] = useState(false)

    const weather = useSelector(state => state.weatherReducer.weather)
    const ubication = useSelector(state => state.empresaReducer.empresaForId.ubicacion)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWeather(ubication))
    },[]) 

    const loteExample = {
        img: '',
        name: 'TERRADA',
        hectareas: 1000

    }
    //Funcion para la botonera de Observaciones y Tareas...

    function btnObsTar(aux){
        if(botonera===''){
            setBotonera(aux)
        }
        if(botonera==='obs' && aux==='tar'){
            setBotonera(aux)
        }
        if(botonera==='tar' && aux==='obs'){
            setBotonera(aux)
        }
        if(botonera==='obs' && aux==='obs'){
            setBotonera('')
        }
        if(botonera==='tar' && aux==='tar'){
            setBotonera('')
        }
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
    function cerrar(){
        dispatch({type:'GET_DETAIL_LOTE',payload:false})
    }
    return(
        <div className={styles.contMain}>
            <div className={styles.contCard}>
                <div className={voltear?styles.cardAct:styles.card}>
                    <div className={styles.loteDetails}>
                        <div className={styles.slider}>
                            <h1 className={styles.name}>{loteExample.name}</h1>
                            <Slider {...settings} >
                                <img src={'https://www.semana.com/resizer/IEcOf8TJx4XxRszD1F26YO7lixw=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/4KEOUCGM7FDRHGJVNJJWTAF464.jpeg'} className={styles.img}/>
                                <img src={'https://www.semana.com/resizer/IEcOf8TJx4XxRszD1F26YO7lixw=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/4KEOUCGM7FDRHGJVNJJWTAF464.jpeg'} className={styles.img}/>
                            </Slider> 
                        </div>
                        <div className={styles.contLogoDelEdit}>
                            <img src={logoDelete} alt="" className={styles.deleteLogo}/>
                            <img src={logoEdit} alt="" className={styles.editLogo} />
                        </div> 
                        <div className={styles.details}>
                        <button onClick={cerrar} className={styles.cross}/>                           
                            <div className={styles.clima}>
                                {
                                    weather?weather.map((c)=>{
                                        return (
                                            <div className={styles.contClima}>
                                                <img src={c.current.condition.icon} className={styles.imgClima}alt="" />
                                                <div className={styles.contClimaText}>
                                                    <p className={styles.dataText}>Ubicación: <span>{c.location.name}</span></p>
                                                    <p className={styles.dataText}>Hectáreas: <span>500</span></p> 
                                                </div>
                                                
                                            </div>
                                        )
                                    }):null
                                }
                            </div>
                            <div className={botonera==='obs'?styles.ghostDivHidden:styles.ghostDiv}>
                                {
                                    weather?weather.map((c)=>{
                                        return(
                                            <div className={styles.contDataClima}>
                                                <p className={styles.dataText}>Temperatura: <span>{c.current.temp_c}</span>°</p>
                                                <p className={styles.dataText}>Velocidad del viento: <span>{c.current.wind_kph}</span>km/h</p>
                                                <p className={styles.dataText}>Humedad: <span>{c.current.humidity}</span>%</p>                          
                                            </div>
                                        )
                                    }):null
                                }                             
                            </div>
                            <div className={styles.obsRec}>
                                {/* <div onClick={()=>{btnObsTar('obs')}} className={botonera=='tar'?styles.contDesactivated:styles.btnObs}>Observaciones</div>
                                <div onClick={()=>{btnObsTar('tar')}} className={botonera==='obs'?styles.contDesactivated:styles.btnObs}>Tareas</div> */}
                                <div onClick={()=>{btnObsTar('obs')}} className={botonera=='obs'?styles.contObsActivated:styles.contObsDesactivated}>
                                    <h1>Observaciones</h1>
                                    <div className={botonera=='obs'?styles.contOverflow:null}>
                                        <div className={styles.contOverflowText}>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={()=>{btnObsTar('tar')}} className={botonera=='tar'?styles.contTareasActivated:styles.contTarDesactivated}>
                                    <h1>Tareas</h1>
                                    <div className={botonera=='tar'?styles.contOverflow:null}>
                                        <p></p>
                                        <p></p>
                                        <p></p>
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
                            <div className={formulario?styles.none:styles.formPrincipio}>
                                <p>¿Qué tipo de dato te gustaría añadir?</p>
                                <div className={styles.choseenCont}>
                                    <button className={styles.btn} onClick={()=>{setFormulario(true)}}>Obsevación</button>
                                    <button className={styles.btn} onClick={()=>{setFormulario(true)}}>Recomendación</button>
                                </div>
                            </div>
                            <div className={formulario?styles.contCargaText:styles.none}>
                                <div className={styles.contTextarea}>
                                    <h2 class={styles.textareatitle}>Indicá tu observación acá abajo</h2>
                                    <textarea name="message" rows="20" cols="100" className={styles.textatera}></textarea>
                                </div> 
                                <div className={styles.cargarImg}>
                                    <p>Adjuntar Imágen</p>
                                    <div class={styles.fileselect} id="src-file1" >
                                        <input type="file" name="src-file1" aria-label="Archivo"/>
                                    </div>
                                </div>
                                <input type='submit' className={styles.submit}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}