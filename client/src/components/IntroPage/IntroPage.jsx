import React from 'react';
import s from './styles.module.css';
import {Link} from 'react-router-dom';
import leaf from '../LandingPage/leaf.png'
import { motion } from 'framer-motion';
import img1 from './imagenes/1.png';
import img2 from './imagenes/2.png';
import img3 from './imagenes/3.png';
import img4 from './imagenes/4.png';
import img5 from './imagenes/5.png';
import img6 from './imagenes/6.png';
import img7 from './imagenes/7.png';
import img8 from './imagenes/8.png';
import img9 from './imagenes/9.png';
import img10 from './imagenes/10.jpg';

const IntroPage = () => {
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
        <div className={s.main}>
            <img className={s.logo} src={leaf}/>
            <h2 className={s.intro}><strong>YO</strong> AGRONOMO</h2>
            <Link to='/index'>
            <button className={s.mainBtn}>INGRESAR</button>
            </Link>
        </div>

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
    <div className={s.slider}>
      <ul>
        <li>
          <figure>
          <Link to = '/index'>
           <div className={s.wrapper}> <img
              alt=""
              src={img1}
            /> <h2 className={s.title}>Gestión Integral Agro</h2> </div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
            <div className={s.wrapper}><img
              alt=""
              src={img2}
            /> <h2 className={s.title}>Manejo Administrativo</h2> </div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
            <div className={s.wrapper}><img
              alt=""
              src={img3}
            /> <h2 className={s.title}>Clima en vivo</h2> </div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img4}
            /> <h2 className={s.title}>Mercados en vivo</h2></div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img5}
            /><h2 className={s.title}>Stock de insumos</h2></div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img6}
            /><h2 className={s.title}>Gestión comercial</h2></div> </Link>
          </figure>
        </li>
        <li>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img7}
            /> <h2 className={s.title}>Stock de granos</h2></div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img8}
            /><h2 className={s.title}>Suscripción premium</h2></div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img9}
            /> <h2 className={s.title}>Plataforma integral</h2></div> </Link>
          </figure>
          <figure>
          <Link to = '/index'>
          <div className={s.wrapper}> <img
              alt=""
              src={img10}
            /> <h2 className={s.title}>Monitoreo</h2></div> </Link>
          </figure>
        </li>
       
      </ul>
    </div>
    </motion.div>
  );




        </motion.div>
    )};
    

export default IntroPage;
