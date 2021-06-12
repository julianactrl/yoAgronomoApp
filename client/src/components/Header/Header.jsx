import React, { useState } from 'react';
import styles from './styles.module.css'
import avatar from '../../assets/avatar.png'
import logo from '../../assets/logo.png'
import {sidebar} from './HeaderController'

export default function Header (verify){

    const [open, setOpen] = useState(false);
    const [btnlogo, setbtnLogo] = useState(false);

    function activateLogo(){
        open?setOpen(false):setOpen(true);
        btnlogo?setbtnLogo(false):setbtnLogo(true);

    }


    return (
        <div className={styles.header}>
            <div className={styles.headertitle}>
                {
                    open?sidebar(verify):null
                }          
                <img src={logo} className={btnlogo?styles.logoAct:styles.logo} onClick={activateLogo}/>     
            </div>
            <div className={styles.perfilbtncont}>
                <button className={styles.perfilbtn}>
                    <img src={avatar} className={styles.perfilimg} />
                </button>
            </div>        
        </div>
    )
}