import React,{useState} from 'react';
import styles from '../LandingPage/styles.module.css'
const Register = () => {

    const [input,setInput] = useState({
        email:"",
        password: "",
        passwordRepeat:"",
        name:"",
        lastName:""
    })

     function handleChange(e){
         console.log(e)
         setInput({
             [e.target.id]: e.target.value
         })
     }

     function handleSubmit(e){
         e.preventDefault();
         console.log(input)
     }
        return (
            <div className={styles.containerD}>
              <div className={styles.box}>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className={styles.loginInput}/>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">Apellido</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    className={styles.loginInput}/>
                </div>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input 
                  onChange={handleChange}
                  type="text" 
                  name="email" 
                  className={styles.loginInput} />
                </div>
      
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Contraseña</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={styles.loginInput}/>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="password">Repetir</label>
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className={styles.loginInput}/>
                </div>
                <button
                  type="button"
                  className={styles.registerBtn}
                  onClick={handleSubmit}>Registrarme</button>
              </div>
            </div>
          );
        }
      

export default Register;