
import React, { useState } from 'react';
import styles from './styles.module.css'
import avatar from '../../assets/avatar.png'

export default function DashBoardProfile() {
    const [active, setActive] = useState(false)


    function renderPerfil() {
        return (
            <div className={styles.perfilDeploy}>
                <button className={styles.perfilbtn}>
                    <img src={'https://lh3.googleusercontent.com/a-/AOh14GjfYdCXIbS9AahQWsfzmCmEkmZ1h0DhCSsYiDZi7g=s96-c'} className={styles.perfilimg} onClick={()=>!active?setActive(true):setActive(false)}/>
                </button>
                <h3 className={styles.title}>GONZALO ARANCIBIA</h3>
                <h3 className={styles.titleLogout}>CERRAR SESION</h3>
            </div>  
        )
    }
    
    return (
        
        <div className={styles.perfilbtncont}>  
            <button className={styles.perfilbtn}>
                <img src={'https://lh3.googleusercontent.com/a-/AOh14GjfYdCXIbS9AahQWsfzmCmEkmZ1h0DhCSsYiDZi7g=s96-c'} className={styles.perfilimg} onClick={()=>{!active?setActive(true):setActive(false)}}/>
            </button>
            {active ?renderPerfil():null}
            
        </div>     

   
    )
}
