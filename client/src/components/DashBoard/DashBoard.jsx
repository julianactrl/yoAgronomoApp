import React, { useState } from 'react';
import Header from '../Header/Header';
import CardsEmpresas from '../CardEmpresa/CardsEmpresas';
import add from '../../assets/añadir.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './styles.module.css'
import Slider from 'react-slick'


export default function DashBoard (){

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
        <div className={styles.main}>
            <div className={styles.mainCont}>
                <div className={styles.div1}></div>
                <div className={styles.div2}></div>
                <div className={styles.div3}></div>
                <h1 className={styles.title}>Mis Empresas</h1>
                {Header('dashboard')}
                <button className={styles.btnNews}/>  
                <div className={styles.body}>
                    <Slider {...settings}>
                        <CardsEmpresas/>
                        <CardsEmpresas/>
                        <CardsEmpresas/>
                        <CardsEmpresas/>
                    </Slider>
                </div>
            </div>
        </div>
      );
    }