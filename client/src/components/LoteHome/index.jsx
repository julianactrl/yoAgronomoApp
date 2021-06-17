
import React, { useEffect } from "react"
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Header from '../Header/Header';
import LoteCard from "./LoteCard";
import add from '../../assets/añadir.png';
import fondo from '../../assets/fondo2.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getAllLotes } from "../../redux/actions/loteActions";

export default function LoteHome ({id}) {
    const allLotes = useSelector(state=> state.loteReducer.allLotes)
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId);
    const dispatch = useDispatch()

    console.log('este es el idddddddddddddddd',empresaId);

    useEffect(async()=>{
        await dispatch(getAllLotes(empresaId.id))
        console.log('esta es la empresa', empresaId, allLotes);
    },[])


    // empresaId: 6
    // id: 1
    // imagen: "https://imganuncios.mitula.net/timbues_barrio_ioppolo_lotes_10_00_x_33_00_metros_con_hasta_el_40_financiacion_4470063618060034108.jpg"
    // name: "Lote3"
    // superficie: "700 m2"
    // ubicacion: "Tucuman"

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

    return (
        <div className={styles.contenedor}>
            <Header />
            <div className={styles.body}>
                <h1 className={styles.tittle}>{empresaId.name}</h1>
                <Slider {...settings}>

                    {
                        allLotes.map((lote, index) => {
                           if(index % 3 == 0 && index != 0) {
                               console.log('estoy en el for de % 3 papa');
                                return (
                                    <div className={styles.contenedorData}>
                                        <div className={styles.contenedorCards}>
                                            <LoteCard lote={allLotes[index]} />
                                            {allLotes[index + 1] && <LoteCard lote={allLotes[index + 1]}/>}
                                            {allLotes[index + 2] && <LoteCard lote={allLotes[index + 2]}/>}
                                            {allLotes[index + 3] && <LoteCard lote={allLotes[index + 3]}/>} 
                                        </div>
                                    </div>
                                    )
                           }else if(index == 0){
                               console.log('estoy en el for');
                               return (
                                <div className={styles.contenedorData}>
                                    <div className={styles.contenedorCards}>
                                        <div  className={styles.cardContAdd} >
                                            <h1 className={styles.titleAdd}>Agregar Lote</h1>
                                            <img src={add} alt="" className={styles.imgAdd}/>
                                        </div> 
                                        <LoteCard lote={allLotes[index]} />
                                        {allLotes[index + 1] && <LoteCard lote={allLotes[index + 1]}/>}
                                        {allLotes[index + 2] && <LoteCard lote={allLotes[index + 2]}/>} 
                                    </div>                            
                                </div>
                                )
                           }
                        })
                    }

{/* 
                    <div className={styles.contenedorData}>
                            <div className={styles.contenedorCards}>
                            <div  className={styles.cardContAdd} >
                                <h1 className={styles.titleAdd}>Agregar Lote</h1>
                                <img src={add} alt="" className={styles.imgAdd}/>
                            </div>
                            <LoteCard lote={lotesAux}/>
                            <LoteCard lote={lotesAux}/>
                            <LoteCard lote={lotesAux}/>
                            </div>
                    </div>
                    <div className={styles.contenedorData}>
                        <div className={styles.contenedorCards}>
                        <LoteCard lote={lotesAux} />   
                        <LoteCard lote={lotesAux}/>
                        <LoteCard lote={lotesAux}/>
                        </div>
                    </div> */}
                </Slider>
            </div>
        </div>
    )
}

// DATA'S LOTES
// id
// name
// superficie
// ubicacion
// imagen