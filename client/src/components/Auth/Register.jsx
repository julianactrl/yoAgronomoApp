import React,{useState,useEffect} from 'react';
import styles from '../LandingPage/styles.module.css';
import {useDispatch,useSelector} from 'react-redux';
import { register } from '../../redux/actions/userActions';
import {Link, useHistory} from 'react-router-dom'


export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = 'Se requiere un Email';
  } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.email)) {
    errors.email = 'Email inválido';
  }
  if (!input.password) {
      errors.password = 'Se requiere una contraseña';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(input.password)) {
      errors.password = 'La contraseña debe contener ocho caracteres, al menos un caracter especial,una mayúscula y un número.';
    }

  return errors;
};

const Register = () => {

    const dispatch = useDispatch()
    let history= useHistory()
    const user = useSelector(state => state.userReducer.user)   

    const [userRegister,setUserRegister] = useState({
        email:"",
        password: "",
        //passwordRepeat:"",
        fullName:""
    })
    
    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({});
    const handleChange = function(e) {
      e.persist();
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
         setLoading(true)
         setUserRegister({
          email:"",
          password: "",
          //passwordRepeat:"",
          fullName:""
      })  
     }
        return (
            <div className={styles.containerD}>
              <form className={styles.form}
              onSubmit={handleSubmit} >
              <div className={styles.box}>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="fullName" ></label>
                  <input
                    placeholder='Nombre y Apellido'
                    onChange={handleChange}
                    id= "fullName"
                    type="text"
                    value={userRegister.fullName}

                    className={styles.loginInput}/>
                </div>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="email"></label>
                  <input 
                  placeholder='yoagronomo@gmail.com'
                  onChange={handleChange}
                  type="text" 
                  id="email"
                  value={userRegister.email} 
                  className={styles.loginInput} />
                  {errors.email && (
                  <p className={styles.error}>{errors.email}</p>
                  )} 
  
                </div>
      
                <div className={styles.inputGroup}>
                  <label  className={styles.labels} htmlFor="password"></label>
                  <input
                  placeholder='Contraseña'
                    onChange={handleChange}
                    type="password"
                    id="password"
                    value={userRegister.password}
                    className={styles.loginInput}/>
                    {errors.password && (
                   <p className={styles.error}>{errors.password}</p>
                   )} 
                </div>
                
                 { userRegister.password && !(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(userRegister.password)) ?
                <button
                  type="submit"
                   className={ styles.registerBtn }
                  >Registrarme</button> : <button type='button' className={styles.disabled}>
                    Registrarme
                  </button>
                 }
                  {
                loading? <div>
                  <img className={styles.loader} src='http://www.hadecoration.gift/public/images/ajax-loader-green.gif' />
                  </div> : <div></div>
              } 
              </div>
              </form>
            </div>
          );
        }
      

export default Register;