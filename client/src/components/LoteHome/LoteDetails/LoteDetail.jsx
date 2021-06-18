import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

export default function LoteDetails({lote}){

    const [voltear, setVoletar] = useState(false);
    const dispatch = useDispatch

    const loteExample = {
        img: '',
        name: 'TERRADA',
        hectareas: 1000

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
        speed: 300,
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
                       
                        <div className={styles.details}>
                        <button onClick={cerrar} className={styles.cross}/>                            
                            <div>
                            </div>
                            <div className={styles.obsRec}>
                                <div className={styles.contAux}>
                                    <h1>Observaciones</h1>
                                    <div className={styles.contOverflow}>
                                        <div className={styles.contOverflowText}>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.contAux}>
                                    <h1>Tareas</h1>
                                    <div className={styles.contOverflow}>
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