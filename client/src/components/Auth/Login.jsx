import React,{useState} from 'react';
import styles from '../LandingPage/styles.module.css'
import { Link } from 'react-router-dom';

const Login = () => {

    const [input,setInput] = useState({
        email:"",
        password: ""
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
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className="form">
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input 
                className={styles.loginInput} 
                type="email" 
                id="email" 
                onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password">Contraseña</label>
                <input 
                className={styles.loginInput} 
                type="password" 
                id="password" 
                onChange={handleChange} />
            </div>
            <div>
                <button className={styles.loginBtn}>Login</button>
                <Link to='/register'>Registrarme</Link>
            </div>
            </form>
            
        </div>
    );
}

export default Login;
