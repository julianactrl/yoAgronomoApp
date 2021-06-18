import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, updateEmpresa} from '../../redux/actions/userActions';
import styles from './styles.module.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useHistory } from 'react-router';

function UpdateProfile ({id}) {
    const currentUser = useSelector(state =>state.userReducer.userInfo)

    const [input, setInput] = useState({
        imagen: '',
        fullName: '',
        email: '',
        password:'',
})

async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        console.log('-------', input)
    }

const dispatch = useDispatch();

// useEffect(()=> {
//     dispatch(getUser());
    
// }, []);



const history = useHistory()
function handleSubmit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3001/user/edit/${id}`, input)
        .then(response => console.log(response.data)) 
        .catch(error  => console.log(error))
    e.target.reset();
    alert('Su usuario fue actualizado!')
    history.push('/home')
    console.log('+++++++++++++', input)
        
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