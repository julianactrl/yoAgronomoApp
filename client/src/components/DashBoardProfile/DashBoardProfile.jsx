
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.module.css'
import avatar from '../../assets/avatar.png'
import { logout } from '../../redux/actions/userActions';

export default function DashBoardProfile() {
    const [active, setActive] = useState(false)
    const dispatch= useDispatch();

    const handleLogout = () =>{
        dispatch(logout)
    }


    function renderPerfil() {
        return (
            <div className={styles.perfilDeploy}>
                <button className={styles.perfilbtn}>
                    <img src={'https://lh3.googleusercontent.com/ogw/ADea4I4TWEqI_V0htMjADTsJbQWWS1lS2Thbn7F5PjN7vg=s83-c-mo'} className={styles.perfilimg} onClick={()=>!active?setActive(true):setActive(false)}/>
                </button>
                <h3 className={styles.title}>GABRIEL PEITEADO</h3>
                <h3 className={styles.titleLogout} onClick={handleLogout}>CERRAR SESION</h3>
            </div>  
        )
    }
    
    return (
        
        <div className={styles.perfilbtncont}>  
            <button className={styles.perfilbtn}>
                <img src={'https://lh3.googleusercontent.com/ogw/ADea4I4TWEqI_V0htMjADTsJbQWWS1lS2Thbn7F5PjN7vg=s83-c-mo'} className={styles.perfilimg} onClick={()=>{!active?setActive(true):setActive(false)}}/>
            </button>
            {active ?renderPerfil():null}
            
        </div>     

   
    )
}
