import React from 'react';
import styles from './styles.module.css';
import {Link} from 'react-router-dom';
import leaf from '../LandingPage/leaf.png'
import { motion } from 'framer-motion';

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
        <div className={styles.main}>
            <img className={styles.logo} src={leaf}/>
            <h2 className={styles.intro}><strong>YO</strong> AGRONOMO</h2>
            <Link to='/index'>
            <button className={styles.mainBtn}>INGRESAR</button>
            </Link>
        </div>
        </motion.div>
    );
}

export default IntroPage;
