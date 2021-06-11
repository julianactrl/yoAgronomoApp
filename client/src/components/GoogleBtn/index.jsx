import { useState } from 'react';
import { GoogleLogin , GoogleLogout} from 'react-google-login'
import {respuestaGoogle, logoutExistoso, logoutRechazado} from './controller';
import styles from '../LandingPage/styles.module.css'


const GoogleBtn = () => {
    //Estado para verificar si esta logueado o no, renderice tales botones.
    const [logined, setLogined] = useState(false)
    return (
        <>
            {!logined ? <GoogleLogin
                className={styles.google}
                clientId='986641154721-5ard4gbec5m5v08eu29onvepopn4qkca.apps.googleusercontent.com'
                buttonText='Acceder con Google'
                onSuccess={(data)=>{respuestaGoogle(data);setLogined(true)}}
                onFailure={respuestaGoogle}
                cookiePolicy={'single_host_origin'}
            />:
            <GoogleLogout
                className={styles.google}
                clientId='986641154721-5ard4gbec5m5v08eu29onvepopn4qkca.apps.googleusercontent.com'
                buttonText='Logout'
                onLogoutSuccess={()=>{logoutExistoso();setLogined(false)}}
                onFailure={logoutRechazado}
                cookiePolicy={'single_host_origin'}
            />}
        </>
    )
}

export default GoogleBtn