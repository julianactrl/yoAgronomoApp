import React,{useState,useEffect} from 'react';
import styles from '../LandingPage/styles.module.css';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../../redux/actions/userActions';
import {Link} from 'react-router-dom'


export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = 'Se requiere un Email';
  } else if (/\S+@\S+\.\S+/.test(input.mail)) {
    errors.email = 'Email is invalid';
  }
  if (!input.password) {
      errors.password = 'Se requiere una contraseña';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(input.password)) {
      errors.password = 'La contraseña debe contener al menos un caracter especial,una mayúscula y un número.';
    }

  return errors;
};

const Register = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer.user)   

    const [userRegister,setUserRegister] = useState({
        email:"",
        password: "",
        //passwordRepeat:"",
        fullName:""
    })

    const [errors, setErrors] = React.useState({});
    const handleChange = function(e) {
      setUserRegister({
        ...userRegister,
        [e.target.id]: e.target.value
      });
      setErrors(validate({
        ...userRegister,
        [e.target.id]: e.target.value
      }));
    }

    
     function handleSubmit(e){
         e.preventDefault();
         console.log(userRegister)
         dispatch(register(userRegister))  
     }
        return (
            <div className={styles.containerD}>
              <form className={styles.form}
              onSubmit={handleSubmit} >
              <div className={styles.box}>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="fullName">Nombre y Apellido</label>
                  <input
                 
                    onChange={handleChange}
                    id= "fullName"
                    type="text"

                    className={styles.loginInput}/>
                </div>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="email">Email</label>
                  <input 
                  onChange={handleChange}
                  type="text" 
                  id="email" 
                  className={styles.loginInput} />
                  {errors.email && (
      <p className={styles.error}>{errors.email}</p>
    )} 
  
                </div>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="password">Contraseña</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    className={styles.loginInput}/>
                    {errors.password && (
      <p className={styles.error}>{errors.password}</p>
    )} 
                </div>
                {/* <div className={styles.inputGroup}>
                  <label htmlFor="password">Repetir</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={styles.loginInput}/>
                </div> */} 
                <button
                  type="submit"
                   className={styles.registerBtn}
                  >Registrarme</button>
              </div>
              </form>
            </div>
          );
        }
      

export default Register;