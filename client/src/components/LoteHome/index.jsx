
import React, { useEffect } from "react"
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
    // const [activador, setActivador] = useState(true)
    const allLotes = useSelector(state=> state.loteReducer.allLotes)  // todos los lotes de la empresa
    const detailLote = useSelector(state=> state.loteReducer.detailLote) // estado para ir al detalle
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId); // todos los datos de la empresa
    // const renderFormCreateLote = useSelector(state=> state.loteReducer.renderFormCreateLote)
    // const createdLote = useSelector(state=>state.loteReducer.createdLote) // lote creado

    const verifyRender = useSelector(state=>state.loteReducer.verifyRender)


    useEffect(async()=>{
        await dispatch(getAllLotes(empresaId.id))
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
      
      // funcion switch renderizar
      function switcher (type) {
        switch (type) {
          case 'detalle':
            return  <LoteDetails lote={detailLote} />
          case 'formularioCrear':
            return <LoteFormCreate empresaId={empresaId.id} />
          default:
            return (
              <>
              <h1 className={styles.tittle}>{empresaId.name}</h1>
              {renderizarLotes(allLotes,LoteCard,Slider,settings)}
              </>
              )
        }
      }

      // Mantiene actualizado los lotes cada vez que se crea uno o se borre
      function auxiliar (verifyRender) {
        if(verifyRender == 'asa') {
          dispatch(getAllLotes(empresaId.id))
        }
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
              {switcher(verifyRender)}
              {auxiliar(verifyRender)}
            </div>
        </div>
    )
}
