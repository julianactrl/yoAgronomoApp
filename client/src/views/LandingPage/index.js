import React from 'react';
import LoginUser from './../../components/LoginUser'
import styles from './styles.module.css'

const LandingPage = () => {

    return (
        <div className={styles.hola}>
            Hola
            <LoginUser />
        </div>
    )
}

export default LandingPage