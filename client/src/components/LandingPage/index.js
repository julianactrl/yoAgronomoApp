import React from 'react';
import { Route,Link } from 'react-router-dom';
import styles from './styles.module.css'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import GoogleBtn from '../GoogleBtn/index.jsx'
import leaf from './leaf.png'
import { motion } from 'framer-motion';


const LandingPage = () => {

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


        <div className={styles.div}>
          <Link to='/'>
            <img className={styles.goBack} alt="not found" src='https://www.seekpng.com/png/full/18-187048_left-arrow-png-free-download-flecha-hacia-arriba.png'/>  
            </Link>
            <div className={styles.title}>
            <h3 className={styles.seleSoy}><strong>YO</strong>AGRONOMO</h3>

            <img className={styles.logo} alt="not found" src={leaf}/>

            </div>
            <div className={styles.options}>
          <div className={styles.contenedorTittle}>
            <Link to="/index">
              <h1 className={styles.login}>Login</h1>
            </Link>

            <Link to="/index/register">
              <h1 className={styles.registro}>Registro</h1>
            </Link>
          </div>  
        </div>

        <Route exact path="/index/register" component={Register} />
        <Route exact path="/index" component={Login} />
        
        <div className={styles.btnGooglee}>
            <GoogleBtn className={styles.btnGooglee}/>
        </div>
        </div>
       
      </motion.div>
    )
}

export default LandingPage