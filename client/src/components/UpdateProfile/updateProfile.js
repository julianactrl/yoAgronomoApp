import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, updateEmpresa,updateUser,logout} from '../../redux/actions/userActions';
import styles from './styles.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useHistory } from 'react-router';
import {Link} from "react-router-dom"
import { faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function UpdateProfile ({id}) {
    const currentUser = useSelector(state =>state.userReducer.userInfo)
   
    var id = currentUser.user.id
    let fullName = currentUser.user.fullName
    let email = currentUser.user.email
    let password = currentUser.user.password
    let profile_pic = currentUser.user.profile_pic
       
    
    const [input, setInput] = useState({
        id:id,
        fullName: '',
        email: '',
        password: '',
        profile_pic: ''
})

async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        console.log('---esto es input----', input)
    }

const dispatch = useDispatch();

// useEffect(()=> {
//     dispatch(getUser());
    
// }, []);


const newInfo = {
    email:input.email,
    password: input.password
}
const history = useHistory()
function handleSubmit(e) {
    alert("¿Seguro desea modificar estos datos?")
    dispatch(updateUser(input))
    alert("Datos modificados correctamente, ingrese sesión nuevamente")
    dispatch(logout())
    history.push("/home")    
}

function deleteUsuario(id) {
        
    // dispatch(deleteEmpresa(id));
    axios.delete(`http://localhost:3001/user/delete/${id}`)
    .then(response => console.log(response.data)) 
    .catch(error  => console.log(error))
    alert('La cuenta del usuario ha sido eliminada')
    
    
}



    return (
        <div className={styles.div}>
            <Header />
         <h2 className={styles.alineado} >Actualizar User</h2>
        <div className={styles.caja}>
        <form className={styles.estilosForm} 
        onSubmit={handleSubmit} 
        > 
            <div>
                <label className={styles.labelCrear}>Nombre: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['fullName']}
                placeholder={currentUser.user.fullName}
                name='fullName' 
                />
            </div>

            <div>
                <label className={styles.labelCrear}>Email </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['email']}
                placeholder={currentUser.user.email}
                name='email'/>
            </div>

            <div>
                <label className={styles.labelCrear}>Password </label>
                <input className={styles.inputCrear}
                type='password'
                onChange={(e)=>handleInputChange(e)} 
                value={input['password']}
                placeholder={currentUser.user.password}
                name='password'/>
            </div>
           
            <div>
                <label className={styles.labelCrear}>Imagen: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['profile_pic']}
                placeholder={currentUser.user.profile_pic}
                name='profile_pic'/>
            </div>
                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Actualizar Usuario</button>
            <Link to={`/`}>
            <h3 onClick={()=>deleteUsuario(id)} className={styles.eliminarEmpresa}><FontAwesomeIcon icon={faUserTimes}/></h3> 
            </Link>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateProfile