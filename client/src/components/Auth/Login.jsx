import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import styles from '../LandingPage/styles.module.css'
import { login } from '../../redux/actions/userActions';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';


export function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = 'Se Requiere un Email';
    } else if (/\S+@\S+\.\S+/.test(input.mail)) {
      errors.email = 'Email inválido';
    }
    if (!input.password) {
        errors.password = 'Se requiere una contraseña';
      } 
  
    return errors;
  };


const Login = () => {


    const dispatch = useDispatch();   
    let history= useHistory();
    const logged = useSelector (state =>state.userReducer.isAuth)

    const [input,setInput] = useState({
        email:"",
        password: ""
    })

    const [errors, setErrors] = useState({});
    const handleChange = function(e) {
      e.persist();
      setInput({
        ...input,
        [e.target.id]: e.target.value
      });
      setErrors(validate({
        ...input,
        [e.target.id]: e.target.value
      }));
    }
  

     function handleSubmit(e){
         e.preventDefault();
         dispatch(login(input))
     }

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
                <label  className={styles.labels} htmlFor="email">Email</label>
                <input 
                placeholder='email@yoagronomo.com'
                className={styles.loginInput} 
                type="email" 
                id="email" 
                value={input.email}
                onChange={handleChange} />
                {errors.email && (
      <p className={styles.error}>{errors.email}</p>
    )} 
            </div>
            <div className={styles.inputGroup}>
                <label  className={styles.labels} htmlFor="password">Contraseña</label>
                <input 
                placeholder='Contraseña'
                className={styles.loginInput} 
                type="password" 
                id="password" 
                value={input.password}
                onChange={handleChange} />
                 {errors.password && (
      <p className={styles.error}>{errors.password}</p>
    )} 
            </div>
            <div>
                <button 
                type= "submit"
                className={styles.loginBtn}>Login</button>
            </div>
            </form>
            
        </div>
    );
}

export default Login;
