import React from 'react';
import styles from './styles.module.css'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import GoogleBtn from '../GoogleBtn/index.jsx'
import leaf from './leaf.png'


const LandingPage = () => {

    return (
        <div className={styles.div}>
            <div className={styles.title}>
            <h1>YO</h1>
            <h2>AGRONOMO</h2>
            <img className={styles.logo} src={leaf}/>
            </div>
            <Login/>
            <GoogleBtn/>
        </div>
    )
}

export default LandingPage