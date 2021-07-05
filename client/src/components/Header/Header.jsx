import React, { useState } from 'react';
import styles from './styles.module.css'
import avatar from '../../assets/avatar.png'
import logo from '../../assets/logo.png'
import {sidebar} from './HeaderController'
import DashBoardProfile from '../DashBoardProfile/DashBoardProfile.jsx'
import Cookies from 'universal-cookie'
import { useSelector } from "react-redux";


export default function Header (verify){
    const userInfo = useSelector((state) => state.userReducer.userInfo.user.isPremium);

    const cookies = new Cookies()
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
                    open?sidebar(cookies.get('selectedEmpresa')):null
                }          
                <img src={logo} className={btnlogo?styles.logoAct:styles.logo} onClick={activateLogo} alt="not found"/>    
                 
            </div>
            <div>
                <DashBoardProfile />
            </div>
        </div>
    )
}