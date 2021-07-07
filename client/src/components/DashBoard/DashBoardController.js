import React from "react";
import styles from './styles.module.css'
import {Link} from 'react-router-dom'
import CardsEmpresas from '../CardEmpresa/CardsEmpresas';
import add from '../../assets/añadir.png';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


export function SliderGrid(allEmpresas){
    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        width: 100,
        classname: 'slides',
      };
      return(
          <Slider {...settings} className={styles.slider}>
            {allEmpresas.map((empresa, index) => {
                if(index % 3 == 0 && index != 0) {
                    return (
                        <div className={styles.contenedorData}>
                            <div className={styles.sliderGrid}>
                                <CardsEmpresas empresa={allEmpresas[index]} />
                                {allEmpresas[index + 1] && <CardsEmpresas empresa={allEmpresas[index + 1]}/>}
                                {allEmpresas[index + 2] && <CardsEmpresas empresa={allEmpresas[index + 2]}/>}
                                {allEmpresas[index + 3] && <CardsEmpresas empresa={allEmpresas[index + 3]}/>} 
                            </div>
                        </div>
                        )
                }else if(index == 0){
                    return (
                    <div className={styles.contenedorData}>
                        <div className={styles.sliderGrid}>
                            <Link path to='/newempresa' className={styles.mainAdd}>
                                <div  className={styles.cardContAdd} >
                                    <h1 className={styles.titleAdd}>Agregar Empresa</h1>
                                <img src={add} alt="" className={styles.imgAdd}/>
                                </div>
                            </Link>
                            <CardsEmpresas empresa={allEmpresas[index]} />
                            {allEmpresas[index + 1] && <CardsEmpresas empresa={allEmpresas[index + 1]}/>}
                            {allEmpresas[index + 2] && <CardsEmpresas empresa={allEmpresas[index + 2]}/>} 
                        </div>                            
                    </div>
                    )
                }
            })}
             {!allEmpresas[0] &&(
                        <div className={styles.contenedorData}>
                            <div className={styles.sliderGrid}>
                                <Link path to='/newempresa' className={styles.mainAdd}>
                                    <div  className={styles.cardContAdd} >
                                        <h1 className={styles.titleAdd}>Agregar Empresa</h1>
                                    <img src={add} alt="" className={styles.imgAdd}/>
                                    </div>
                                </Link>
                            </div>                            
                        </div> 
                )}
          </Slider>
      )

}

export function SliderGridCelular (allEmpresas) {
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



    console.log('las empresas ghe', allEmpresas);
    return (
        <Slider {...settingsCelu} className={styles.sliderCelular}>

            <Link path to='/newempresa' className={styles.link}>
                <div className={styles.mainCelular}>
                    <div  className={styles.cardContAdd} >
                        <h1 className={styles.titleAdd}>Agregar Empresa</h1>
                    <img src={add} alt="" className={styles.imgAdd}/>
                    </div>
                </div>
            </Link>

            {allEmpresas.map((empresa, index) =>{
                return  <div className={styles.mainCelular}>
                            <div className={styles.contenedorEmpresa}>
                                <CardsEmpresas empresa={empresa} />
                            </div>
                        </div>
                })
            } 
        
        </Slider>
    )
}


