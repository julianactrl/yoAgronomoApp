import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom'
import CardsEmpresas from '../CardEmpresa/CardsEmpresas';
import add from '../../assets/añadir.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import styles from './styles.module.css'
import News from '../News/News.js'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmpresas } from '../../redux/actions/empresaActions';
import {clearWeather} from '../../redux/actions/weatherActions'
import {motion} from 'framer-motion';
import Cookies from 'universal-cookie';


export default function DashBoard (){

  const cookies = new Cookies()
  const [showNews, setShowNews]= useState(false)
  const [stateAux, setStateAux]= useState(false)
  const dispatch = useDispatch()
  const allEmpresas = useSelector(state => state.empresaReducer.allEmpresas)
  const userId = useSelector(state => state.userReducer.userInfo.user.id)
 
  
  useEffect(()=>{   
      dispatch(clearWeather()) 
      dispatch(getAllEmpresas(userId))
      setStateAux(true)
      cookies.set('selectedEmpresa', '', {path:'/', expires: new Date(Date.now()+2592000)})
  },[])
  useEffect(()=>{
    console.log(allEmpresas);
},[stateAux])

  function news(){
   if(!showNews){setShowNews(true)}else{setShowNews(false)}
  }


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
        <div className={showNews?styles.mainContNews:styles.main}>
            <div className={styles.mainCont}>
                {Header('dashboard')}
                <div className={showNews?styles.newsContainer:styles.newsContainerAct}>
                    {
                    showNews?<News/>:null
                    } 
                </div>
                <button className={showNews?styles.btnNewsOpen:styles.btnNews} data-tooltip='News!' onClick={news}></button> 
                <div className={showNews?styles.bodyNone:styles.body}>
                <h1 className={styles.title}>Mis Empresas</h1>
                    <Slider {...settings}>
                      <Link path to='/newempresa' className={styles.mainAdd}>
                        <div  className={styles.cardContAdd} >
                            <h1 className={styles.titleAdd}>Agregar Empresa</h1>
                          <img src={add} alt="" className={styles.imgAdd}/>
                        </div>
                      </Link>
                      {
                        allEmpresas.map((empresa)=> <CardsEmpresas empresa={empresa}/>)
                      }
                    </Slider>
                </div>
            </div>
        </div>
        </motion.div>
      );
    }
