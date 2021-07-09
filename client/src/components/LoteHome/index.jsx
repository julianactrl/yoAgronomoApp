
import React, { useEffect } from "react"
import styles from './styles.module.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import Header from '../Header/Header';
import LoteCard from "./LoteCard";
import LoteDetails from "./LoteDetails/LoteDetail";
import LoteFormCreate from './LoteFormCreate/LoteFormCreate'
import {renderizarLotes, renderizarLotesCelular} from './controller'
import add from '../../assets/añadir.png';
import fondo from '../../assets/fondo2.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getAllLotes } from "../../redux/actions/loteActions";
import {clearWeather} from "../../redux/actions/weatherActions"
import Cookies from "universal-cookie";
import {motion} from 'framer-motion';



export default function LoteHome ({id}) {
    const cookies = new Cookies()
    const dispatch = useDispatch()
    // const [activador, setActivador] = useState(true)
    const allLotes = useSelector(state=> state.loteReducer.allLotes)  // todos los lotes de la empresa
    const detailLote = useSelector(state=> state.loteReducer.detailLote) // estado para ir al detalle
    // const empresaId = useSelector(state=>state.empresaReducer.empresaForId); // todos los datos de la empresa
    // const renderFormCreateLote = useSelector(state=> state.loteReducer.renderFormCreateLote)
    // const createdLote = useSelector(state=>state.loteReducer.createdLote) // lote creado

    const verifyRender = useSelector(state=>state.loteReducer.verifyRender) // estado global que segun el tipo renderiza todos los lotes o el formLote o el detailLote
    const nameEmpresa = useSelector(state=> state.empresaReducer.empresaForId.name)

    useEffect(async()=>{
        await dispatch(getAllLotes(cookies.get('selectedEmpresa').id))
        dispatch(clearWeather())
    },[])
      // funcion switch renderizar
      function switcher (type) {
        switch (type) {
          case 'detalle':
            return  <LoteDetails lote={detailLote} />
          case 'formularioCrear':
            return <LoteFormCreate empresaId={cookies.get('selectedEmpresa').id} />
          default:
            return (
              <div className={styles.contSecundario}>
                {renderizarLotes(allLotes,LoteCard,Slider,settings)}
                <div className={styles.celular}>
                  {renderizarLotesCelular(allLotes,LoteCard,Slider,settingsCelu)}
                </div>
              </div>
              )
        }
      }

      // Mantiene actualizado los lotes cada vez que se crea uno o se borre
      function auxiliar (verifyRender) {
        if(verifyRender === '') {
          dispatch(getAllLotes(cookies.get('selectedEmpresa').id))
          dispatch({type:'SET_VERIFY',payload:'default'})
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
      };
      function SampleNextArrow(props) {
        const { style, onClick } = props;
        return (
          <div
            className={styles.arrowNext}
            style={style}
            onClick={onClick}
          />
        );
      }
      function SamplePrevArrow(props) {
        const { style, onClick } = props;
        return (
          <div
          className={styles.arrowPrev}
            style={style}
            onClick={onClick}
          />
        );
      }
      const settingsCelu = {
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
      <motion.div
      initial='hidden'
      animate='visible'
      variants={{
      hidden: {
          opacity: -1
      },
      visible: {
          opacity: 1,
          transition: 1
      }
      }}>
        <div className={styles.contenedor}>
            <Header />
            <div className={styles.body}>
              <h4 className={styles.titleh5}>{nameEmpresa}</h4>
              {switcher(verifyRender)}
              {auxiliar(verifyRender)}
            </div>
        </div>
      </motion.div>

    )
}
