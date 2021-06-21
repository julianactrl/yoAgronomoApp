import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, updateEmpresa,updateUser,logout} from '../../redux/actions/userActions';
import styles from './styles.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useHistory } from 'react-router';

function UpdateProfile ({id}) {
    const currentUser = useSelector(state =>state.userReducer.userInfo)
   
   
        var id = currentUser.user.id
    
    const [input, setInput] = useState({
        id:id,
        fullName: '',
        email: '',
        password:'',
        profile_pic: ''
})

async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        console.log('---estoe s input----', input)
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
    dispatch(updateUser(input))
    dispatch(logout())
    history.push("/home")    
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
                placeholder={currentUser.fullName}
                name='fullName' 
                />
            </div>

            <div>
                <label className={styles.labelCrear}>Email </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['email']}
                placeholder={currentUser.email}
                name='email'/>
            </div>

            <div>
                <label className={styles.labelCrear}>Password </label>
                <input className={styles.inputCrear}
                type='password'
                onChange={(e)=>handleInputChange(e)} 
                value={input['password']}
                placeholder={currentUser.password}
                name='password'/>
            </div>
           
            <div>
                <label className={styles.labelCrear}>Imagen: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={handleInputChange} 
                value={input['imagen']}
                placeholder={currentUser.imagen}
                name='imagen'/>
            </div>
                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Actualizar Usuario</button>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateProfile