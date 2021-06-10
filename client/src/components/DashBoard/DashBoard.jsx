import React, { useState } from 'react';
import styles from './styles.module.css'
import Header from '../Header/Header';
import CardsEmpresas from '../CardEmpresa/CardsEmpresas';
import add from '../../assets/añadirr.png';
import Slider from "react-slick";


export default function DashBoard (){
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };


    return (
        <div className={styles.main}>
            <Header/>
            <div className={styles.containercardbtn}>
                <div className={styles.container}>
                    <CardsEmpresas/>
                    <CardsEmpresas/>
                    <CardsEmpresas/>
                </div>
                    <div className={styles.add}>
                        <div className={styles.cardContAdd}>
                            <img src={add} className={styles.imgAdd}/>
                        </div>
                    </div>
                <div className={styles.btncontainer}>
                    <button className={styles.btn}/>
                </div>   
            </div>
        </div>
    )
}