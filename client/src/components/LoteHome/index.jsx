
import React, { useEffect, useState } from "react"
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Header from '../Header/Header';
import LoteCard from "./LoteCard";
import LoteDetails from "./LoteDetails/LoteDetail";
import LoteFormCreate from './LoteFormCreate/LoteFormCreate'
import {renderizarLotes} from './controller'
import add from '../../assets/añadir.png';
import fondo from '../../assets/fondo2.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getAllLotes } from "../../redux/actions/loteActions";


export default function LoteHome ({id}) {
    const dispatch = useDispatch()
    const [activador, setActivador] = useState(true)
    const allLotes = useSelector(state=> state.loteReducer.allLotes)  // todos los lotes de la empresa
    const detailLote = useSelector(state=> state.loteReducer.detailLote) // estado para ir al detalle
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId); // todos los datos de la empresa
    const renderFormCreateLote = useSelector(state=> state.loteReducer.renderFormCreateLote)

    console.log('este es el idddddddddddddddd',empresaId);

    useEffect(async()=>{
        await dispatch(getAllLotes(empresaId.id))
        // await dispatch({type:'GET_DETAIL_LOTE',payload:false})
        console.log('esta es la empresa', empresaId, allLotes);
        console.log('detalle de loteeeeeeeeeeeeeeeee',detailLote);
        console.log('me renderize');
    },[])



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
            {/* { <button onClick={()=> {dispatch({type:'GET_DETAIL_LOTE',payload:false});dispatch({type:'GET_FORM_LOTE',payload:false})}} >DETALLE</button>} */}
            <div className={styles.body}> 
                {(!detailLote && !renderFormCreateLote) && <h1 className={styles.tittle}>{empresaId.name}</h1>}
                {!detailLote && !renderFormCreateLote ? renderizarLotes(allLotes,LoteCard,Slider,settings)
                :(renderFormCreateLote?<LoteFormCreate empresaId={empresaId.id} />: <LoteDetails lote={detailLote} />)}
                {/* {renderFormCreateLote && <LoteFormCreate />} */}
            </div>
        </div>
    )
}

// DATA'S LOTES
    // empresaId: 6
    // id: 1
    // imagen: "https://imganuncios.mitula.net/timbues_barrio_ioppolo_lotes_10_00_x_33_00_metros_con_hasta_el_40_financiacion_4470063618060034108.jpg"
    // name: "Lote3"
    // superficie: "700 m2"
    // ubicacion: "Tucuman"