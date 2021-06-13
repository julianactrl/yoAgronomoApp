import { useState } from 'react';
import { GoogleLogin , GoogleLogout} from 'react-google-login'
import { logoutExistoso, logoutRechazado} from './controller';
import styles from '../LandingPage/styles.module.css'
import { register } from '../../redux/actions/userActions';
import {useDispatch,useSelector} from 'react-redux';
import { Redirect } from 'react-router';


const GoogleBtn = () => {
    const dispatch = useDispatch();

    //Estado para verificar si esta logueado o no, renderice tales botones.
    const [logined, setLogined] = useState(false)

    // funcion que recibe los datos del usuario que se logueo con google y los manda a DB
    function respuestaGoogle(data) {
        if(data.profileObj){
            const {email, familyName , googleId, imageUrl, name} = data.profileObj;//profileObj contiene la info del usuario
            dispatch(register({
                email:email,
                password: familyName + name.length +'A@',
                fullName:name,
                profile_pic: imageUrl,
                googleId: googleId
                
            }))
            return console.log('Acceso con googlee existoso', data.profileObj);
        }
        return console.log('Error al acceder con google');    
    }

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
            /> && <Redirect to='/home' />}
        </>
    )
}

export default GoogleBtn
