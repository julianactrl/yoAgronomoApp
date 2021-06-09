import React from 'react';
import LoginUser from '../LoginUser'
import styles from './styles.module.css'
import GoogleBtn from '../GoogleBtn/index.jsx'

const LandingPage = () => {

    return (
        <div className={styles.hola}>
            Hola
            <LoginUser />
            <GoogleBtn />

        </div>
    )
}

export default LandingPage