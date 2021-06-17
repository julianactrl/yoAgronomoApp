import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles.module.css'
import { logout } from '../../redux/actions/userActions';
import userReducer from '../../redux/reducers/userReducer'
import jwt_decode from "jwt-decode";




export default function DashBoardProfile() {
    const [active, setActive] = useState(false)
     const token = useSelector(state => state.userReducer.userInfo.token)


    if(token){
        var decoded = jwt_decode(token)
    }
    
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
                <h3 className={styles.title}>
                {decoded.fullName} 
                </h3>
                <h3>Email: 
                    {/* {currentUser.email} */}
                    </h3>
                <h3 className={styles.titleLogout} onClick={handleLogout}>CERRAR SESION</h3>
            </div>  
        )
    }

    
    return (
        
        <div className={styles.perfilbtncont}>  
           
            {active ?renderPerfil(): <button className={styles.perfilbtn}>
                
                <img src={'https://lh3.googleusercontent.com/ogw/ADea4I4TWEqI_V0htMjADTsJbQWWS1lS2Thbn7F5PjN7vg=s83-c-mo'} className={styles.perfilimg} onClick={()=>{!active?setActive(true):setActive(false)}}/>
            </button>}
            
        </div>     

   
    )
}
